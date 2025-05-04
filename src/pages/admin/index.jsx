import React, { useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
// import { ContextApi } from '../../helper/ContextApi'
import Footer from '../../components/Footer'
import PromoCodeForm from '../../components/PromoCodeForm';
import UserManagement from '../../components/UserManagement';

const Admin = () => {
  const [activeAdminTab, setActiveAdminTab] = useState('users')

  // Render content based on activeAdminTab
  const renderAdminContent = () => {
    switch (activeAdminTab) {
      case 'users':
        return <UserManagement />;
      case 'promocode':
        return <PromoCodeForm />;
      case 'withdrawals':
        return <div>Withdrawal Checks Section (to be implemented)</div>;
      default:
        return <div>Select an admin menu item</div>;
    }
  };

  return (
    <div className="font-sans flex flex-col h-screen">
      <AdminNavbar setActiveAdminTab={setActiveAdminTab} activeAdminTab={activeAdminTab} />
      <div className="flex-grow bg-[#121215] p-4 overflow-y-auto">
        {renderAdminContent()}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Admin;
