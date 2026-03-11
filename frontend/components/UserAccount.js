"use client";

import { useState } from 'react';

const UserAccount = ({ isOpen, onClose, user, orders = [] }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    avatar: '👤'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: [
        { name: 'Wireless Headphones Pro', price: 79.99, quantity: 1, emoji: '🎧' },
        { name: 'Smart Watch Ultra', price: 199.99, quantity: 1, emoji: '⌚' }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 149.99,
      items: [
        { name: 'Gaming Controller Elite', price: 69.99, quantity: 1, emoji: '🎮' },
        { name: 'Premium Laptop Bag', price: 49.99, quantity: 1, emoji: '💼' }
      ]
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in shadow-2xl">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-slate-900 p-6 border-r dark:border-slate-700">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition"
                >
                  ✕
                </button>
              </div>

              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">{userInfo.avatar}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{userInfo.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{userInfo.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h3>
                    <button
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className="px-4 py-2 btn-primary text-white rounded-lg"
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl dark:bg-slate-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl dark:bg-slate-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl dark:bg-slate-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-xl dark:bg-slate-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order History</h3>
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">Order #{order.id}</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Placed on {order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}>
                              {order.status}
                            </span>
                            <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                              ${order.total}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-600 dark:to-slate-500 rounded-lg flex items-center justify-center">
                                <span className="text-xl">{item.emoji}</span>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 dark:text-white">{item.name}</h5>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-bold text-gray-900 dark:text-white">${item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Wishlist</h3>
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">❤️</span>
                    <p className="text-gray-500 dark:text-gray-400">Your wishlist is empty</p>
                    <button className="mt-4 px-6 py-3 btn-primary text-white rounded-xl">
                      Browse Products
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4">Notifications</h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Email notifications', desc: 'Receive order updates via email' },
                          { label: 'SMS notifications', desc: 'Get shipping updates via text' },
                          { label: 'Marketing emails', desc: 'Receive promotional offers' }
                        ].map((setting, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white">{setting.label}</h5>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">{setting.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4">Security</h4>
                      <div className="space-y-4">
                        <button className="w-full text-left p-4 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition">
                          <h5 className="font-medium text-gray-900 dark:text-white">Change Password</h5>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Update your account password</p>
                        </button>
                        <button className="w-full text-left p-4 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition">
                          <h5 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h5>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Add an extra layer of security</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;