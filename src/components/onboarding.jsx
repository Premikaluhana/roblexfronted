// components/OnboardingStepper.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOnboardingStatus } from "../utlis/Api";
import SocialFollowStep from "./SocialFollowStep";
import ProfileFormStep from "./ProfileFormStep";
import BlogVisitStep from "./BlogVisitStep";
import OfferwallStep from "./OfferwallStep";

const OnboardingStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkProgress = async () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
          navigate('/');
          return;
        }
        const res = await getOnboardingStatus();
        console.log('Onboarding status response:', res);
        
        if (!isMounted) return;
        
        if (res?.isOnboardingComplete) {
          console.log('Onboarding is complete, redirecting to dashboard');
          navigate("/dashboard");
          return;
        }
        
        setProgress(res);
        
        if (res) {
          if (!res.followedSocials) setCurrentStep(1);
          else if (!res.filledProfile) setCurrentStep(2);
          else if (res.visitedBlogPosts < 3) setCurrentStep(3);
          else if (!res.completedOfferwall) setCurrentStep(4);
        }
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    checkProgress();

    return () => {
      isMounted = false;
    };
  }, []); // Remove navigate from dependencies

  const handleStepComplete = async () => {
    try {
      const updated = await getOnboardingStatus();
      console.log('Updated onboarding status:', updated);
      
      if (!updated) {
        console.error('Failed to get updated status');
        return;
      }
      
      setProgress(updated);
  
      const allStepsCompleted = updated.followedSocials &&
        updated.filledProfile &&
        updated.visitedBlogPosts >= 3 &&
        updated.completedOfferwall;
  
      if (allStepsCompleted) {
        console.log('All steps completed, redirecting to dashboard');
        navigate("/dashboard");
      } else {
        if (!updated.followedSocials) setCurrentStep(1);
        else if (!updated.filledProfile) setCurrentStep(2);
        else if (updated.visitedBlogPosts < 3) setCurrentStep(3);
        else if (!updated.completedOfferwall) setCurrentStep(4);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121215]">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-4 border-[#5B6DF6] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-medium text-gray-300">
            Loading onboarding progress…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121215] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1E2237] rounded-xl shadow-lg p-6 border border-[#21395e]">
          <h1 className="text-3xl font-bold text-white mb-2">
            Onboarding Process
          </h1>
          
          {/* Progress Steps */}
          <div className="flex justify-between mb-2 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#21395e] -translate-y-1/2"></div>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${
                      currentStep >= step
                        ? "bg-[#5B6DF6] text-white"
                        : "bg-[#21395e] text-gray-400"
                    }`}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mt-8">
            {currentStep === 1 && (
              <SocialFollowStep
                onComplete={handleStepComplete}
                isCompleted={progress?.followedSocials}
                changeCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 2 && (
              <ProfileFormStep
                onComplete={handleStepComplete}
                isCompleted={progress?.filledProfile}
                changeCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 3 && (
              <BlogVisitStep
                onComplete={handleStepComplete}
                visitedCount={progress?.visitedBlogPosts}
                changeCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 4 && (
              <OfferwallStep
                onComplete={handleStepComplete}
                isCompleted={progress?.completedOfferwall}
                changeCurrentStep={setCurrentStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStepper;
