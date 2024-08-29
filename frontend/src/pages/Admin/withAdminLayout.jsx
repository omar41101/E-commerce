// withAdminLayout.js
import React from 'react';
import AdminMenu from './AdminMenu'; // Import your AdminMenu component

const withAdminLayout = (WrappedComponent) => {
  const WithAdminLayout = (props) => {
    return (
      <div className="admin-layout min-h-screen bg-gray-900 text-white">
        <AdminMenu />
        <main className="p-4">
          <WrappedComponent {...props} />
        </main>
      </div>
    );
  };

  return WithAdminLayout;
};

export default withAdminLayout;
