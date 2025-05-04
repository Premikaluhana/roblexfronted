import React, { useState } from 'react';
import { updateUserProfile } from '../utlis/Api';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate passwords
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      const updateData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      };

      await updateUserProfile(updateData);
      setSuccess('Password changed successfully!');
      
      // Clear password fields after successful update
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1E2237] rounded-xl p-6 shadow-lg overflow-y-auto max-h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-semibold mb-6 sticky top-0 bg-[#1E2237] py-2 z-10">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#21395e] border border-[#2b3a6b] focus:border-[#5B6DF6] focus:outline-none"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#21395e] border border-[#2b3a6b] focus:border-[#5B6DF6] focus:outline-none"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#21395e] border border-[#2b3a6b] focus:border-[#5B6DF6] focus:outline-none"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium ${
            loading
              ? 'bg-[#2b3a6b] text-gray-400 cursor-not-allowed'
              : 'bg-[#5B6DF6] hover:bg-[#4a5bd4] text-white'
          } transition-colors`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Updating...
            </div>
          ) : (
            'Change Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword; 