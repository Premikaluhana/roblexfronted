import { useContext, useEffect, useState } from "react";
import { getUserGames } from "../utlis/Api";
import { ContextApi } from "../helper/ContextApi";

const Withdraw = ({ withdrawHandler }) => {
  const { user } = useContext(ContextApi);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      if (user?.robloxId) {
        try {
          setLoading(true);
          const data = await getUserGames(user.robloxId);
          setGames(data || []);
          if (data && data.length > 0) {
            setSelectedGame(data[0]);
          }
        } catch (err) {
          console.error("Error fetching games:", err);
          setError("Failed to load your games. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchGames();
  }, [user?.robloxId]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleWithdraw = async () => {
    if (!selectedGame) {
      setError("Please select a game");
      return;
    }

    if (!amount || parseInt(amount) < 5) {
      setError("Minimum withdrawal is 5 Robux");
      return;
    }

    if (parseInt(amount) > user.robuxBalance) {
      setError("Insufficient balance");
      return;
    }

    try {
      console.log(selectedGame, parseInt(amount));
      setLoading(true);
      setError("");
      await withdrawHandler(selectedGame.placeId, parseInt(amount));
      setSuccess("Withdrawal request submitted successfully!");
      setAmount("");
    } catch (err) {
      console.error("Withdrawal error:", err);
      // Show more specific error message from the API
      setError(err.message || "Failed to process withdrawal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid p-20 sm:p-10">
        <section className="border border-gray-800 rounded-xl bg-black shadow-md lg:w-[75%] md:w-[80%] mx-auto sm:w-[90%]">
          <div className="p-4">
            <h2 className="font-bold text-white text-lg mb-2">
              Trouble withdrawing?
            </h2>
            <p className="text-gray-400 mb-3 text-base">
              Join our Discord and we will help you out!
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md shadow-md transition-colors duration-200"
              type="button"
            >
              Join Discord
            </button>
          </div>
        </section>
        <div className="text-[#b3b6c5] font-extrabold text-2xl select-none mt-5 mb-5 lg:w-[75%] md:w-[80%] mx-auto sm:w-[90%]">
          Withdraw robux
        </div>
        <section className="rounded-xl bg-black p-6 shadow-md space-y-6 lg:w-[75%] md:w-[80%] mx-auto sm:w-[90%]">
          <h2 className="text-[#eaedf5] font-extrabold text-lg">Pass payout</h2>
          <section className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 border border-[#21395e] rounded-lg p-4 text-center md:text-left bg-[#1754]">
              <p className="font-semibold text-[#e6e7eb] mb-1">Your balance:</p>
              <div className="flex items-center justify-center md:justify-start gap-1 text-[#ffffff] text-base font-normal">
                {user?.robuxBalance || 0}
                <i
                  aria-hidden="true"
                  className="fas fa-cube text-[#12fca6]"
                  style={{ textShadow: "0 0 2px #0f6b4a" }}
                ></i>
              </div>
            </div>
            <div className="flex-1 border border-[#21395e] rounded-lg p-4 text-center md:text-left bg-[#1754]">
              <p className="font-semibold text-[#e6e7eb] mb-1">Stock:</p>
              <div className="flex items-center justify-center md:justify-start gap-1 text-[#ffff] text-base font-normal">
                <span className="underline decoration-[#e6e7eb] decoration-dotted cursor-pointer">
                  23965
                </span>
                <span className="text-[#ffff]">/ 620598</span>
                <i
                  aria-hidden="true"
                  className="fas fa-cube text-[#fff]"
                  style={{ textShadow: "0 0 2px #0f6b4a" }}
                ></i>
              </div>
            </div>
          </section>
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[#b5b7bb] font-semibold">Select game</p>
              <a className="text-[#3B49E0] font-semibold text-sm" href="https://www.roblox.com/develop" target="_blank" rel="noopener noreferrer">
                Create new game
              </a>
            </div>
            
            {loading && games.length === 0 ? (
              <div className="w-full flex items-center justify-center p-4 bg-[#1E2237] rounded-lg">
                <p className="text-white">Loading your games...</p>
              </div>
            ) : games.length === 0 ? (
              <div className="w-full flex items-center justify-center p-4 bg-[#1E2237] rounded-lg">
                <p className="text-white">No games found. Create a game on Roblox first.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {games.map((game) => (
                  <button
                    key={game.placeId}
                    className={`w-full flex items-center gap-4 rounded-lg p-3 text-[#fff] text-base font-normal border ${
                      selectedGame?.placeId === game.placeId
                        ? "bg-[#3B49E0] border-[#566CF9]"
                        : "bg-[#1E2237] border-[#112644]"
                    }`}
                    type="button"
                    onClick={() => setSelectedGame(game)}
                  >
                    <img
                      alt={`${game.name} icon`}
                      className="w-12 h-12 rounded-md flex-shrink-0"
                      src={game.thumbnailUrl || "https://www.roblox.com/favicon.ico"}
                    />
                    <span>{game.name}</span>
                  </button>
                ))}
              </div>
            )}
          </section>
          <section className="space-y-2">
            <label className="block text-[#b5b7bb] font-semibold" htmlFor="withdraw">
              How much would you like to withdraw?
            </label>
            <p className="italic text-[#a3a7ae] text-sm -mt-1 mb-2">
              Between 5 and 1500
            </p>
            <input
              aria-describedby="info-text"
              className="w-full rounded-md bg-[#1E2237] border border-[#D1D5DB] text-[#fff] text-lg font-normal p-3 focus:outline-none focus:ring-2 focus:ring-[#3B49E0] transition"
              id="withdraw"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </section>
          <section className="border rounded-md p-4 flex items-center gap-4 text-[#fff] text-sm bg-[#000]">
            <i
              aria-hidden="true"
              className="fas fa-info-circle text-[#6B7280] flex-shrink-0"
            ></i>
            <p className="leading-tight">
              We pay the Roblox creator tax (30%) for you! That's why we will
              expect to find a pass with the value
              <span className="inline-block w-20"></span> as price in the selected
              server.
            </p>
          </section>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-900/50 border border-green-700 text-green-200 p-3 rounded-md">
              {success}
            </div>
          )}
          
          <button
            className="w-full bg-[#566CF9] hover:bg-[#3B49E0] transition rounded-md py-3 text-white font-extrabold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={handleWithdraw}
            disabled={loading || !selectedGame || !amount || parseInt(amount) < 5 || parseInt(amount) > user?.robuxBalance}
          >
            {loading ? "Processing..." : "Redeem"}
          </button>
        </section>
      </div>
    </>
  );
};

export default Withdraw;