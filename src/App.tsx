/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { KioskProvider, useKiosk } from './context/KioskContext';
import { KioskHeader } from './components/common/KioskHeader';
import { KioskFooter } from './components/common/KioskFooter';
import { AdvisorModal } from './components/common/AdvisorModal';
import { CancelModal } from './components/common/CancelModal';
import { InactivityModal } from './components/common/InactivityModal';

// Screens
import { Screen0Welcome } from './components/screens/Screen0Welcome';
import { Screen1Account } from './components/screens/Screen1Account';
import { Screen2Connect } from './components/screens/Screen2Connect';
import { Screen3InternalDiagnostic } from './components/screens/Screen3InternalDiagnostic';
import { Screen4ExternalScan } from './components/screens/Screen4ExternalScan';
import { Screen5Valuation } from './components/screens/Screen5Valuation';
import { Screen6Catalog } from './components/screens/Screen6Catalog';
import { Screen7Payment } from './components/screens/Screen7Payment';
import { Screen8Deposit } from './components/screens/Screen8Deposit';
import { Screen9Receipt } from './components/screens/Screen9Receipt';
import { Screen10Locker } from './components/screens/Screen10Locker';

const KioskContent: React.FC = () => {
  const { currentStep, kioskFrameMode } = useKiosk();

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 0:
        return <Screen0Welcome />;
      case 1:
        return <Screen1Account />;
      case 2:
        return <Screen2Connect />;
      case 3:
        return <Screen3InternalDiagnostic />;
      case 4:
        return <Screen4ExternalScan />;
      case 5:
        return <Screen5Valuation />;
      case 6:
        return <Screen6Catalog />;
      case 7:
        return <Screen7Payment />;
      case 8:
        return <Screen8Deposit />;
      case 9:
        return <Screen9Receipt />;
      case 10:
        return <Screen10Locker />;
      default:
        return <Screen0Welcome />;
    }
  };

  return (
    <div className="w-full h-screen bg-slate-950 flex items-center justify-center p-0 overflow-hidden font-sans select-none">
      {/* Container: If kioskFrameMode is active, wrap in a brushed dark metal bezel with camera notch and thermal printer slot */}
      <div
        className={`w-full h-full flex flex-col transition-all duration-300 ${
          kioskFrameMode
            ? 'max-w-[1720px] max-h-[960px] aspect-video border-[14px] border-slate-800 rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-4 ring-slate-700/50 overflow-hidden relative'
            : 'rounded-none'
        }`}
      >
        {/* Kiosk Hardware Top Bezel Details (Visible in kiosk frame mode) */}
        {kioskFrameMode && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
          </div>
        )}

        {/* Top Header */}
        <KioskHeader />

        {/* Screen Dynamic Body */}
        <main className="flex-1 flex flex-col min-h-0 overflow-y-auto relative">
          {renderCurrentScreen()}
        </main>

        {/* Persistent Bottom Disclaimer & Quick Jump Bar */}
        <KioskFooter />

        {/* Modals */}
        <AdvisorModal />
        <CancelModal />
        <InactivityModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <KioskProvider>
      <KioskContent />
    </KioskProvider>
  );
}
