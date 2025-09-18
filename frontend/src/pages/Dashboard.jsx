import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Chat from '../components/Chat';
import InsuranceOptions from '../components/InsuranceOptions';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <header className="bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Insure AI Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="rounded-md bg-white/50 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300/50 hover:bg-white/70 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        {selectedTopic ? (
          <div className="h-[calc(100vh-180px)]">
            <Chat topic={selectedTopic} />
          </div>
        ) : (
          <InsuranceOptions onSelect={handleSelectTopic} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
