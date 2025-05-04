import { useState } from 'react';
import { updateUserProfile } from '../utlis/Api';

const ProfileFormStep = ({ onComplete, isCompleted, changeCurrentStep }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !phone) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await updateUserProfile(email, phone);
      console.log('Profile update response:', res);
      if (res.success) {
        onComplete();
        changeCurrentStep(3);
      } else {
        setError(res.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 bg-none rounded-lg focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg transition-colors ${
            loading
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-[#5B6DF6] hover:bg-[#4a5bd4] text-white'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </div>
          ) : (
            'Save Profile'
          )}
        </button>
      </form>

      {isCompleted && (
        <div className="mt-6">
          <button
            onClick={() => changeCurrentStep(3)}
            className="w-full bg-[#5B6DF6] hover:bg-[#4a5bd4] text-white py-3 px-4 rounded-lg transition-colors"
          >
            Continue to Next Step →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileFormStep;