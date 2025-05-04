import { useContext, useEffect, useState } from "react";
import { ContextApi } from "../helper/ContextApi";
import { addPoints, createWithdrawal, deductPoints, getLeaderboard, getPointsHistory, getWithdrawalHistory } from "../utlis/Api";
import EarnRobux from "./EarnBox";
import Withdraw from "./withdraw";
import Rewards from "./rewardPromo";
import Event from "./event";
import { Navigate } from 'react-router-dom';
import Settings from "../pages/Settings";

export const RenderContent = () => {
  const { activeTab, setActiveTab, user, BoardingComplete } = useContext(ContextApi);
  const [amount, setAmount] = useState(0);
  const [descrption, setDescrption] = useState('');
  const [Data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const itemsPerPage = 8;

  // Only redirect if user is new and onboarding is not complete
  if (user?.isNew && !BoardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  // Helper function to mask username
  const maskUsername = (username) => {
    if (!username || username.length <= 2) {
      return username;
    }
    const firstChar = username.charAt(0);
    const lastChar = username.charAt(username.length - 1);
    const stars = '*'.repeat(username.length - 2);
    return firstChar + stars + lastChar;
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination handlers
  const totalPages = Data ? Math.ceil(Data.length / itemsPerPage) : 1;

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Get current page data
  const currentData = Data ? Data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const pointAddHandler = () => {
    const response = addPoints(amount, descrption);
    alert("Points added succuessfully");
    console.log(response);
    setActiveTab('pointsHistory');
  };
  
  const withdrawHandler = async (gameId, amount) => {
    try {
      setLoading(true);
      const response = await createWithdrawal(gameId, amount);
      console.log(response);
      setActiveTab('withdrawalHistory');
      return response;
    } catch (error) {
      console.error("Withdrawal error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const pointDebutHandler = () => {
    const response = deductPoints(amount, descrption);
    alert("Points debuct succuessfully");
    console.log(response);
    setActiveTab('pointsHistory');
  };

  const dataShowhandler = async () => {
    try {
      setLoading(true);
      setError("");
      
      if (activeTab === 'pointsHistory') {
        const response = await getPointsHistory();
        console.log(response);
        setData(response);
      } else if (activeTab === 'withdrawalHistory') {
        const response = await getWithdrawalHistory();
        console.log(response);
        setData(response);
      } else if (activeTab === 'leaderboard') {
        const response = await getLeaderboard();
        console.log(response);
        setData(response);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataShowhandler();
  }, [activeTab]);

  // Reset currentPage to 1 when Data or activeTab changes to avoid out of range page
  useEffect(() => {
    setCurrentPage(1);
  }, [Data, activeTab]);
  
  switch (activeTab) {
    case 'offerWall':
      return (
        <EarnRobux/>
      );
    case 'reward':
      return (
        <Rewards/>
      );
    case 'event':
      return (
        <Event/>
      );
    case "settings":
      return (
        <Settings/>
      );
    case 'create':
      return <Withdraw withdrawHandler={withdrawHandler} />;
    case 'withdrawalHistory':
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-white mb-6">Withdrawal History</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-md">
              {error}
            </div>
          ) : Data?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#1E2237] rounded-lg overflow-hidden">
                <thead className="bg-[#2b2b49]">
                  <tr>
                    <th className="py-3 px-4 text-left text-white font-semibold">ID</th>
                    <th className="py-3 px-4 text-left text-white font-semibold">Game</th>
                    <th className="py-3 px-4 text-left text-white font-semibold">Amount</th>
                    <th className="py-3 px-4 text-left text-white font-semibold">Status</th>
                    <th className="py-3 px-4 text-left text-white font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Data.map((withdrawal, index) => (
                    <tr key={withdrawal._id || index} className="border-t border-gray-700">
                      <td className="py-3 px-4 text-white">{withdrawal._id?.substring(0, 8) || 'N/A'}</td>
                      <td className="py-3 px-4 text-white">{withdrawal.gameId || 'N/A'}</td>
                      <td className="py-3 px-4 text-white flex items-center gap-1">
                        {withdrawal.amount}
                        <i
                          aria-hidden="true"
                          className="fas fa-cube text-[#12fca6]"
                          style={{ textShadow: "0 0 2px #0f6b4a" }}
                        ></i>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          withdrawal.status === 'completed' ? 'bg-green-900/50 text-green-300' :
                          withdrawal.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-red-900/50 text-red-300'
                        }`}>
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white">{formatDate(withdrawal.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {Data.length > itemsPerPage && (
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#2b2b49] text-white rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="flex items-center text-white">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#2b2b49] text-white rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#1E2237] p-8 rounded-lg text-center">
              <p className="text-gray-400">No withdrawal history found.</p>
              <button 
                onClick={() => setActiveTab('create')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md"
              >
                Make a Withdrawal
              </button>
            </div>
          )}
        </div>
      );
    case 'pointsHistory':
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-white mb-6">Points History</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-md">
              {error}
            </div>
          ) : Data?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#1E2237] rounded-lg overflow-hidden">
                <thead className="bg-[#2b2b49]">
                  <tr>
                    <th className="py-3 px-4 text-left text-white font-semibold">ID</th>
                    <th className="py-3 px-4 text-left text-white font-semibold">Amount</th>
                    <th className="py-3 px-4 text-left text-white font-semibold">Type</th>
                    <th className="py-3 px-4 text-left text-white font-semibold">Description</th>
                    <th className="py-3 px-4 text-left text-white font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Data.map((transaction, index) => (
                    <tr key={transaction._id || index} className="border-t border-gray-700">
                      <td className="py-3 px-4 text-white">{transaction._id?.substring(0, 8) || 'N/A'}</td>
                      <td className="py-3 px-4 text-white flex items-center gap-1">
                        {transaction.amount}
                        <i
                          aria-hidden="true"
                          className="fas fa-cube text-[#12fca6]"
                          style={{ textShadow: "0 0 2px #0f6b4a" }}
                        ></i>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          transaction.type === 'withdrawal' ? 'bg-red-900/50 text-red-300' :
                          transaction.type === 'promo' ? 'bg-purple-900/50 text-purple-300' :
                          'bg-green-900/50 text-green-300'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white">{transaction.description || 'N/A'}</td>
                      <td className="py-3 px-4 text-white">{formatDate(transaction.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {Data.length > itemsPerPage && (
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#2b2b49] text-white rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="flex items-center text-white">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#2b2b49] text-white rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#1E2237] p-8 rounded-lg text-center">
              <p className="text-gray-400">No points history found.</p>
            </div>
          )}
        </div>
      );
    case 'leaderboard':
      return (
        <div className="flex flex-col items-center justify-start gap-12">
          <div className="w-full bg-[#181d35] rounded-xl p-8 flex flex-col items-center gap-10 shadow-lg">
            <h1 className="font-extrabold text-4xl flex items-center gap-5 select-none">
              Leaderboard
              <span className="text-3xl">🏆</span>
            </h1>
            {/* user cards */}
            <div className="items-center w-full gap-2 grid grid-cols-4">
              {currentData?.sort((a, b) => b.robuxBalance - a.robuxBalance).map((v, k) => {
                return (
                  <div key={k} className="w-ful text-center flex gap-2 flex-col items-center">
                    <div className="w-25 h-25 rounded-full border border-[#b3c1ff] flex items-center justify-center">
                      <img
                        alt={v.username}
                        className="w-full h-full object-cover"
                        src={v.avatar}
                      />
                    </div>
                    <h2 className="font-extrabold text-xl">{maskUsername(v.username)}</h2>
                    <p className="font-semibold flex items-center gap-3 text-sm whitespace-nowrap">
                      <span>Earned: {v.robuxBalance}</span>
                      <i
                        aria-hidden="true"
                        className="fas fa-cube text-[#0F6B4A]"
                        style={{ textShadow: "0 0 2px #0f6b4a" }}
                      ></i>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* user card */}
          <div className="w-full bg-[#181d35] rounded-xl p-8 shadow-lg">
            <table className="w-full text-[#1f2937] border-collapse">
              <thead>
                <tr className="bg-gray-700 text-blue-50">
                  <th className="text-left font-bold py-4 px-8 w-1/6">RANK</th>
                  <th className="text-left font-bold py-4 px-8 w-1/2">USERNAME</th>
                  <th className="text-left font-bold py-4 px-8 w-1/3">EARNINGS</th>
                </tr>
              </thead>
              <tbody>
                {currentData?.sort((a, b) => b.robuxBalance - a.robuxBalance).map((v, k) => (
                  <tr key={k} className="border-b text-white border-[#d1d5db] hover:bg-[#202124]">
                    <td className="py-5 px-8 font-semibold">{(currentPage - 1) * itemsPerPage + k + 1}</td>
                    <td className="py-5 px-8 font-semibold">{maskUsername(v.username)}</td>
                    <td className="py-5 px-8 font-semibold flex items-center gap-3 whitespace-nowrap">
                      {v.robuxBalance}
                      <i
                        aria-hidden="true"
                        className="fas fa-cube text-[#0F6B4A]"
                        style={{ textShadow: "0 0 2px #0f6b4a" }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1E2237] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Your Balance</h2>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">{user?.robuxBalance || 0}</span>
                <i
                  aria-hidden="true"
                  className="fas fa-cube text-[#12fca6] text-2xl"
                  style={{ textShadow: "0 0 2px #0f6b4a" }}
                ></i>
              </div>
            </div>
            
            <div className="bg-[#1E2237] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('create')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                >
                  Withdraw Robux
                </button>
                <button 
                  onClick={() => setActiveTab('offerWall')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
                >
                  Earn Robux
                </button>
              </div>
            </div>
            
            <div className="bg-[#1E2237] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-2">
                <p className="text-gray-300">No recent activity</p>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default RenderContent;
