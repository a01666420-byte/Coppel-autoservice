import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  StepId,
  DemoScenario,
  CustomerProfile,
  DiagnosedPhone,
  ValuationDetails,
  CatalogPhone,
  PaymentSelection,
  TransactionReceipt,
} from '../types/kiosk';
import { MOCK_CUSTOMER, generateDiagnosedPhone, CATALOG_PHONES } from '../data/mockData';
import { sounds } from '../utils/soundEffects';

interface KioskContextType {
  currentStep: StepId;
  goToStep: (step: StepId) => void;
  demoScenario: DemoScenario;
  setDemoScenario: (scenario: DemoScenario) => void;
  customer: CustomerProfile | null;
  setCustomer: (cust: CustomerProfile | null) => void;
  loginCustomer: () => void;
  diagnosedPhone: DiagnosedPhone;
  valuation: ValuationDetails;
  selectedPhone: CatalogPhone | null;
  setSelectedPhone: (phone: CatalogPhone | null) => void;
  paymentSelection: PaymentSelection | null;
  setPaymentSelection: (payment: PaymentSelection | null) => void;
  receipt: TransactionReceipt | null;
  setReceipt: (receipt: TransactionReceipt | null) => void;
  acceleratePickupTimer: () => void;
  isAdvisorModalOpen: boolean;
  setIsAdvisorModalOpen: (open: boolean) => void;
  isCancelModalOpen: boolean;
  setIsCancelModalOpen: (open: boolean) => void;
  isInactivityModalOpen: boolean;
  inactivityCountdown: number;
  dismissInactivityModal: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  kioskFrameMode: boolean;
  toggleKioskFrameMode: () => void;
  resetSession: () => void;
}

const KioskContext = createContext<KioskContextType | undefined>(undefined);

export const KioskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<StepId>(0);
  const [demoScenario, setDemoScenarioState] = useState<DemoScenario>('excelente');
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);

  // Initialize phone diagnosis and valuation based on scenario
  const initial = generateDiagnosedPhone('excelente');
  const [diagnosedPhone, setDiagnosedPhone] = useState<DiagnosedPhone>(initial.phone);
  const [valuation, setValuation] = useState<ValuationDetails>(initial.valuation);

  const [selectedPhone, setSelectedPhone] = useState<CatalogPhone | null>(CATALOG_PHONES[0]);
  const [paymentSelection, setPaymentSelection] = useState<PaymentSelection | null>(null);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

  // UI Modals
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isInactivityModalOpen, setIsInactivityModalOpen] = useState<boolean>(false);
  const [inactivityCountdown, setInactivityCountdown] = useState<number>(10);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [kioskFrameMode, setKioskFrameMode] = useState<boolean>(false);

  // Inactivity tracking (60s)
  const lastInteractionTimeRef = useRef<number>(Date.now());
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const setDemoScenario = (scenario: DemoScenario) => {
    setDemoScenarioState(scenario);
    const updated = generateDiagnosedPhone(scenario);
    setDiagnosedPhone(updated.phone);
    setValuation(updated.valuation);
    sounds.playClick();
  };

  const loginCustomer = () => {
    setCustomer(MOCK_CUSTOMER);
  };

  const goToStep = useCallback((step: StepId) => {
    sounds.playClick();
    setCurrentStep(step);
    lastInteractionTimeRef.current = Date.now();
    setIsInactivityModalOpen(false);
  }, []);

  const resetSession = useCallback(() => {
    sounds.playClick();
    setCurrentStep(0);
    setCustomer(null);
    setSelectedPhone(CATALOG_PHONES[0]);
    setPaymentSelection(null);
    setReceipt(null);
    setIsAdvisorModalOpen(false);
    setIsCancelModalOpen(false);
    setIsInactivityModalOpen(false);
    const updated = generateDiagnosedPhone('excelente');
    setDiagnosedPhone(updated.phone);
    setValuation(updated.valuation);
    setDemoScenarioState('excelente');
    lastInteractionTimeRef.current = Date.now();
  }, []);

  const toggleSound = () => {
    const next = !isSoundEnabled;
    setIsSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  const toggleKioskFrameMode = () => {
    setKioskFrameMode(prev => !prev);
    sounds.playClick();
  };

  const acceleratePickupTimer = () => {
    if (receipt) {
      setReceipt({
        ...receipt,
        countdownSeconds: 0,
        isReadyForPickup: true,
      });
      sounds.playFanfare();
    }
  };

  // Activity listeners
  const recordActivity = useCallback(() => {
    lastInteractionTimeRef.current = Date.now();
    if (isInactivityModalOpen) {
      setIsInactivityModalOpen(false);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    }
  }, [isInactivityModalOpen]);

  const dismissInactivityModal = () => {
    sounds.playClick();
    recordActivity();
  };

  useEffect(() => {
    const handleUserAction = () => {
      recordActivity();
    };

    window.addEventListener('pointerdown', handleUserAction);
    window.addEventListener('keydown', handleUserAction);
    window.addEventListener('touchstart', handleUserAction);

    return () => {
      window.removeEventListener('pointerdown', handleUserAction);
      window.removeEventListener('keydown', handleUserAction);
      window.removeEventListener('touchstart', handleUserAction);
    };
  }, [recordActivity]);

  // Inactivity check every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Only track if beyond screen 0
      if (currentStep === 0) return;
      if (isInactivityModalOpen) return;

      const idleDuration = Date.now() - lastInteractionTimeRef.current;
      if (idleDuration >= 60000) {
        // Trigger 10-second warning modal
        setIsInactivityModalOpen(true);
        setInactivityCountdown(10);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentStep, isInactivityModalOpen]);

  // Countdown timer inside inactivity modal
  useEffect(() => {
    if (isInactivityModalOpen) {
      countdownIntervalRef.current = setInterval(() => {
        setInactivityCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current!);
            resetSession();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [isInactivityModalOpen, resetSession]);

  // Timer countdown for locker receipt (30 min / 1800s countdown)
  useEffect(() => {
    if (!receipt || receipt.isReadyForPickup) return;

    const timer = setInterval(() => {
      setReceipt(prev => {
        if (!prev) return null;
        if (prev.countdownSeconds <= 1) {
          return {
            ...prev,
            countdownSeconds: 0,
            isReadyForPickup: true,
          };
        }
        return {
          ...prev,
          countdownSeconds: prev.countdownSeconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [receipt]);

  return (
    <KioskContext.Provider
      value={{
        currentStep,
        goToStep,
        demoScenario,
        setDemoScenario,
        customer,
        setCustomer,
        loginCustomer,
        diagnosedPhone,
        valuation,
        selectedPhone,
        setSelectedPhone,
        paymentSelection,
        setPaymentSelection,
        receipt,
        setReceipt,
        acceleratePickupTimer,
        isAdvisorModalOpen,
        setIsAdvisorModalOpen,
        isCancelModalOpen,
        setIsCancelModalOpen,
        isInactivityModalOpen,
        inactivityCountdown,
        dismissInactivityModal,
        isSoundEnabled,
        toggleSound,
        kioskFrameMode,
        toggleKioskFrameMode,
        resetSession,
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export const useKiosk = () => {
  const context = useContext(KioskContext);
  if (!context) {
    throw new Error('useKiosk must be used within a KioskProvider');
  }
  return context;
};
