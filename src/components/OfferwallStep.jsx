import React, { useState } from "react";
import { completeOfferwall } from "../utlis/Api";

const OfferwallStep = ({ onComplete, isCompleted, changeCurrentStep }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const task = {
    id: 'survey',
    title: 'Complete a Survey',
    reward: '50 Robux',
    description: 'Answer a few questions to earn Robux'
  };

  const handleComplete = async () => {
    if (tasksCompleted === 0) {
      setError("Please complete the task before proceeding");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await completeOfferwall();
      console.log('Offerwall completion response:', res);
      if (res?.success) {
        onComplete();
      } else {
        setError(res?.message || "Failed to complete offerwall. Please try again.");
      }
    } catch (err) {
      setError("Failed to complete offerwall. Please try again.");
      console.error("Error completing offerwall:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskStart = async () => {
    try {
      // Here you would typically open the task in a new window
      // window.open(`/tasks/${task.id}`, '_blank');
      
      // For now, we'll simulate task completion
      setTasksCompleted(prev => prev + 1);
    } catch (error) {
      console.error('Error starting task:', error);
      setError('Failed to start task. Please try again.');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#1E2237] p-4 rounded-lg border border-[#21395e] flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#21395e] [&::-webkit-scrollbar-thumb]:bg-[#5B6DF6] [&::-webkit-scrollbar-thumb]:rounded-full">
          <h2 className="text-xl font-semibold text-white mb-2">
            Complete Offerwall Task
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            Complete the task below to earn Robux that you can use in Roblox.
          </p>

          <div className="space-y-2 mb-6">
            <div className="bg-[#21395e] p-3 rounded-lg border border-[#2b3a6b]">
              <h3 className="text-base font-medium text-white mb-2">
                How it works:
              </h3>
              <ul className="space-y-1.5 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-[#5B6DF6] mr-2">•</span>
                  Click the "Start Task" button below
                </li>
                <li className="flex items-start">
                  <span className="text-[#5B6DF6] mr-2">•</span>
                  Complete the survey to earn Robux
                </li>
                <li className="flex items-start">
                  <span className="text-[#5B6DF6] mr-2">•</span>
                  Return here and click "Complete Step"
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#21395e] p-2 rounded-lg border border-[#2b3a6b]">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-medium text-white mb-3">
                {task.title}
              </h3>
              <p className="text-gray-400 text-sm  max-w-md">
                {task.description}
              </p>
              <div className="flex items-center text-[#5B6DF6] font-medium ">
                <span className="text-lg">Reward: {task.reward}</span>
              </div>
              <button
                onClick={handleTaskStart}
                className={`w-full max-w-xs px-4 py-2 rounded-lg text-base ${
                  tasksCompleted > 0
                    ? "bg-[#2b3a6b] text-gray-400 cursor-not-allowed"
                    : "bg-[#5B6DF6] hover:bg-[#4a5bd4] text-white"
                } transition-colors`}
              >
                Start Task
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#21395e]">
          {error && (
            <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => changeCurrentStep(3)}
              className="px-3 py-1.5 bg-[#21395e] text-white text-sm rounded-md hover:bg-[#2b3a6b] transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleComplete}
              disabled={loading || isCompleted || tasksCompleted === 0}
              className={`px-3 py-1.5 rounded-md text-sm ${
                isCompleted || tasksCompleted === 0
                  ? "bg-[#2b3a6b] text-gray-400 cursor-not-allowed"
                  : "bg-[#5B6DF6] hover:bg-[#4a5bd4] text-white"
              } transition-colors`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5"></div>
                  Completing...
                </div>
              ) : isCompleted ? (
                "✓ Completed"
              ) : (
                "Complete Step"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferwallStep;
