import React, { useState } from 'react';

const FunFactsDialog = ({
  open,
  onClose,
  mostInterviewedDepartment,
  mostPopularSkill,
  topInterviewer,
  longestInterviewDuration,
  quickestHireTime,
  topJobRole,
  roleCount,
}) => {
  if (!open) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={open}
        className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-4 px-7 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
      >
        🎉 Fun Facts
      </button>

        <div className="modal">
          <div className="modal-content">
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Fun Facts!</h2>

                {/* Most Interviewed Department */}
                <p className="text-lg font-medium text-gray-800 text-center mb-4">
                🏢 The <span className="font-semibold text-indigo-600">{mostInterviewedDepartment}</span>  department is on fire! 🔥 They’ve conducted the most interviews!
                </p>

                {/* Most Popular Skill */}
                <p className="text-lg font-medium text-gray-800 text-center mb-4">
                  💡 <span className="font-semibold text-indigo-600">{mostPopularSkill}</span> was the most popular skill in demand. Everyone’s talking about it! 🚀
                </p>

                {/* Top Interviewer */}
                <p className="text-lg font-medium text-gray-800 text-center mb-4">
                  🏆 <span className="font-semibold text-indigo-600">{topInterviewer}</span> conducted the most interviews. Bow down to the master of hiring! 🙌
                </p>

                {/* Longest Interview */}
                <p className="text-lg font-medium text-gray-800 text-center mb-3">
                  ⏳ The longest interview lasted <span className="font-semibold text-indigo-600">{longestInterviewDuration} minutes</span>. Hope they brought coffee! ☕
                </p>

                {/* Quickest Hire */}
                <p className="text-lg font-medium text-gray-800 text-center mb-3">
                  🚀 Quickest hire decision? Just <span className="font-semibold text-indigo-600">{quickestHireTime} minutes</span>. Lightning speed! ⚡
                </p>

                {/* Top Job Role */}
                <p className="text-lg font-medium text-gray-800 text-center mb-3">
                  🎯 <span className="font-semibold text-indigo-600">{topJobRole}</span> was the most popular role with <span className="font-semibold text-indigo-600">{roleCount}</span> interviews. Hot seat! 🔥
                </p>

                <button
                  onClick={onClose}
                  className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default FunFactsDialog;
