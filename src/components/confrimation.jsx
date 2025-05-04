import React from 'react';

const AvatarPopup = ({ avatarUrl, onConfirm, onCancel,username }) => {
  return (
      <div className="bg-black/25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-sm border border-white/20 rounded-lg py-10 px-10 text-center  md:w-[50%] w-[90%] lg:w-[30%] space-y-3 h-fit">
        <h3 className="text-xl mb-2 font-semibold">Is this your avatar?</h3>
        <img src={avatarUrl} alt="Roblox Avatar" className="w-24 h-24 mx-auto mb-4 rounded-full" />
        <div className="flex justify-center gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={()=>onConfirm(username)}>
            Yes
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
  );
};

export default AvatarPopup;
