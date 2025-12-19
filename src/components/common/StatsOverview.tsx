import React from 'react';
import { Button } from './Button';

interface StatsOverviewProps {
  completed: number;
  total: number;
  completionRate: number;
  onCompleteAll: () => void;
  completingAll: boolean;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  completed,
  total,
  completionRate,
  onCompleteAll,
  completingAll,
}) => {
  return (
    <div className="mb-8 animate-slide-up">
      <div className="bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Completed */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-700">{completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-700">{total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">Progress</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-purple-700">{completionRate}%</p>
                  <span className="text-sm text-purple-600">{completed}/{total}</span>
                </div>
                <div className="mt-2 w-full bg-purple-100 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Complete All Button */}
        {total > 0 && completed < total && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={onCompleteAll}
              disabled={completingAll}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {completingAll ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Completing tasks...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Complete All Tasks
                </div>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};