import { useState, useContext } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { redeemPromoCode, addPoints } from "../utlis/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextApi } from "../helper/ContextApi";
const RewardsPromocodes = () => {
  const [promocode, setPromocode] = useState("");

  const redeem = async () => {
    try {
      const response = await redeemPromoCode(promocode);
      console.log(response);
      toast.success("Promo code redeemed successfully!");
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage); // Show error message in toast
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="rounded-lg bg-[#4a66f8] flex flex-col md:flex-row items-center p-6 sm:p-8 md:p-10 gap-6 md:gap-0 relative overflow-hidden shadow">
        <div className="flex-1 max-w-full ">
          <h1 className="font-extrabold leading-tight mb-2 text-2xl sm:text-3xl md:text-4xl text-white">
            Rewards &amp; Promocodes
          </h1>
          <p className="font-normal mb-6 max-w-md text-sm sm:text-base md:text-base text-white">
            Redeem <strong>Promocodes</strong> for free Robux and keep an eye on our{" "}
            <a className="font-semibold underline hover:text-[#2a3bff]" href="#">
              Discord
            </a>{" "}
            and other socials for free promocodes!
          </p>
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Promocode"
              className="flex-1 rounded-md bg-[#3a4adf] border border-[#5a6dfd] px-3 py-2 sm:px-4 sm:py-3 placeholder:text-[#8a9aff] focus:outline-none focus:ring-2 focus:ring-[#2a3bff] text-[#aabaff] text-sm sm:text-base"
              value={promocode}
              onChange={(e) => setPromocode(e.target.value)}
            />
            <button
              aria-label="Submit promocode"
              type="submit"
              className="bg-black rounded-md px-3 py-2 sm:px-4 sm:py-3 text-[#4a66f8] hover:text-[#e6e9ff] cursor-pointer transition text-base sm:text-lg"
              onClick={redeem}
            >
              <AiOutlineEnter />
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-end z-10">
          <img
            src="https://blx.gg/img/flyingroblox.webp"
            alt="3D Roblox character flying to the right with a blue cap and glowing jetpack"
            className="w-[180px] sm:w-[220px] md:w-[280px] h-auto object-contain"
            draggable="false"
          />
        </div>
      </section>
    </>
  );
};

const LevelCard = ({ level, amount, isUnlocked, onUnlock, currentLevel }) => {
  const handleClaim = async () => {
    try {
      if (level > currentLevel) {
        toast.error(`You need to reach level ${level} to claim this reward.`);
        return;
      }

      await addPoints(amount, `Unlocked level ${level}`);
      toast.success(`You claimed ${amount} points for unlocking level ${level}!`);

      // Check if the user leveled up
      const newLevel = Math.floor((currentLevel * 10 + amount) / 10) + 1;
      if (newLevel > currentLevel) {
        toast.success(`Congratulations! You leveled up to level ${newLevel}!`);
      }

      onUnlock(level); // Mark the level as unlocked
    } catch (error) {
      console.error(error);
      toast.error("Failed to claim points.");
    }
  };

  return (
    <div className="border border-gray-600 rounded-md p-6 flex flex-col items-center bg-black">
      <span className="text-xs text-gray-100 mb-2">LVL {level}</span>
      <div className="flex items-center space-x-2 font-extrabold text-gray-300 text-2xl">
        <span>{amount}</span>
        <i
          aria-hidden="true"
          className="fas fa-cube text-[#0F6B4A]"
          style={{ textShadow: "0 0 2px #0f6b4a" }}
        ></i>
      </div>
      <button
        className={`mt-6 ${
          isUnlocked ? "bg-gray-800 text-gray-200" : "bg-[#0f6b4a] text-white"
        } font-semibold rounded-md w-20 py-2`}
        onClick={handleClaim}
        disabled={isUnlocked}
      >
        {isUnlocked ? "Claimed" : "Claim"}
      </button>
    </div>
  );
};

const RewardsLevels = ({ currentLevel }) => {
  const levels = [
    { level: 2, amount: 5 },
    { level: 3, amount: 5 },
    { level: 4, amount: 10 },
    { level: 5, amount: 20 },
    { level: 6, amount: 40 },
    { level: 7, amount: 50 },
    { level: 8, amount: 50 },
    { level: 9, amount: 50 },
    { level: 10, amount: 75 },
    { level: 11, amount: 75 },
    { level: 12, amount: 75 },
    { level: 13, amount: 100 },
    { level: 14, amount: 100 },
    { level: 15, amount: 200 },
    { level: 16, amount: 200 },
    { level: 17, amount: 500 },
    { level: 18, amount: 500 },
  ];

  const [unlockedLevels, setUnlockedLevels] = useState([]);

  const handleUnlock = (level) => {
    setUnlockedLevels((prev) => [...prev, level]);
  };

  return (
    <main className="max-w-[1280px] mx-auto">
      <h2 className="font-extrabold text-lg mb-6 text-gray-400">
        Earn more rewards by leveling up!
      </h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-[1280px]">
        {levels.map(({ level, amount }) => (
          <LevelCard
            key={level}
            level={level}
            amount={amount}
            isUnlocked={unlockedLevels.includes(level)}
            onUnlock={handleUnlock}
            currentLevel={currentLevel} // Pass current level
          />
        ))}
      </section>
    </main>
  );
};

const Rewards = () => {
  const { user } = useContext(ContextApi);

  // Calculate current level
  const robux = user?.robuxBalance || 0;
  const currentLevel = Math.floor(robux / 10) + 1;

  const handleAddPoints = async () => {
    try {
      const response = await addPoints(10, 'Completed a task');
      console.log('Points added:', response);
    } catch (error) {
      console.error('Failed to add points:', error);
    }
  };

  return (
    <div className="text-gray-200 min-h-screen p-6 sm:p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <RewardsPromocodes />
        <RewardsLevels currentLevel={currentLevel} />
      </div>
    </div>
  );
};
export default Rewards;