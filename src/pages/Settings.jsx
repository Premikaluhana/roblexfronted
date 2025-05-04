import React from 'react';
import UpdateProfile from '../components/UpdateProfile';
import ChangePassword from '../components/ChangePassword';

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 sticky top-0 bg-[#0F172A] py-4 z-10">Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpdateProfile />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default Settings; 