"use client";
import React from "react";

const PricingTable: React.FC = () => {
  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
            {/* Monthly Free Plan */}
            <div className="h-full">
              <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                <div className="mb-5">
                  <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">
                    Monthly Free Plan
                  </div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">
                      $
                    </span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">
                      0
                    </span>
                    <span className="text-slate-500 font-medium">/mo</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-5">
                    Basic file upload and sharing features
                  </div>
                  <a
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                    href="#0"
                  >
                    Get Started
                  </a>
                </div>
                <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">
                  Includes:
                </div>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3">
                  <li className="flex items-center">
                    <span>Basic file upload and sharing</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Monthly Paid Plan */}
            <div className="h-full">
              <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                <div className="mb-5">
                  <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">
                    Monthly Paid Plan
                  </div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">
                      $
                    </span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">
                      4
                    </span>
                    <span className="text-slate-500 font-medium">/mo</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-5">
                    Enhanced features including chat functionality
                  </div>
                  <a
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                    href="#0"
                  >
                    Choose Plan
                  </a>
                </div>
                <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">
                  Includes:
                </div>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3">
                  <li className="flex items-center">
                    <span>Basic file upload and sharing</span>
                  </li>
                  <li className="flex items-center">
                    <span>Chat functionality</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Annual Paid Plan */}
            <div className="h-full">
              <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                <div className="mb-5">
                  <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">
                    Annual Paid Plan
                  </div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">
                      $
                    </span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">
                      40
                    </span>
                    <span className="text-slate-500 font-medium">/year</span>
                  </div>
                  <div className="text-sm text-slate-500 mb-5">
                    Enhanced features including chat functionality
                  </div>
                  <a
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                    href="#0"
                  >
                    Choose Plan
                  </a>
                </div>
                <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">
                  Includes:
                </div>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3">
                  <li className="flex items-center">
                    <span>Basic file upload and sharing</span>
                  </li>
                  <li className="flex items-center">
                    <span>Chat functionality</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingTable;
