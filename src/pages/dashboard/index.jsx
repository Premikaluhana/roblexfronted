import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { RenderContent } from '../../components/renderContent'
import { ContextApi } from '../../helper/ContextApi'

const Dashboard = () => {
  const {CheckAuthStatus}=useContext(ContextApi)
  useEffect(()=>{
    CheckAuthStatus()
  },[])
  return (
    <div className='font-sans flex flex-col h-screen'>
      <Navbar/>
      <div className="flex-grow grid grid-cols-1 relative lg:grid-cols-[1fr_5fr] bg-[#121215]  overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#393939] [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:max-h-[100px]">
         <div
            id="google-ads-box"
            className="h-[200px] relative lg:sticky top-0 lg:h-screen w-full bg-[#1E2237]  flex items-center justify-center text-gray-500 text-xl font-semibold select-none lg:block"
          >
            Google Ads
          </div>
         <div className='w-full p-4 '>
            <RenderContent/>
         </div>
      </div>
    </div>
  )
}

export default Dashboard



























// import React, { useState, useContext, useEffect } from 'react';
// import { ContextApi } from '../../helper/ContextApi';
// import { addPoints, createWithdrawal, deductPoints, getLeaderboard, getPointsHistory, getWithdrawalHistory } from '../../utlis/Api';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const { user } = useContext(ContextApi);
//   const [amount,setAmount]=useState(0)
//   const [descrption,setDescrption]=useState('')
//   const [Data,setData]=useState(null)
//   const [GameId,setGameId]=useState(null)
//   //  console.log(user)
//   const pointAddHandler=()=>{
//     const response=addPoints(amount,descrption)
//     alert("Points added succuessfully")
//     console.log(response)
//     setActiveTab('pointsHistory')
//   }
  
//   const withdrawHandler=()=>{
//     const response=createWithdrawal(GameId,amount)
//     alert("Withhdraw succuessfully")
//     console.log(response)
//     setActiveTab('withdrawalHistory')
//   }
//   const pointDebutHandler=()=>{
//     const response=deductPoints(amount,descrption)
//     alert("Points debuct succuessfully")
//     console.log(response)
//     setActiveTab('pointsHistory')
//   }
//   const dataShowhandler=async()=>{
//     if(activeTab==='pointsHistory'){
//       const response=await getPointsHistory()
//       console.log(response)
//       setData(response)
//      }else if(activeTab==='withdrawalHistory'){
//       const response=await getWithdrawalHistory()
//       console.log(response)
//       setData(response)
//      }
//      else if(activeTab==='leaderboard'){
//       const response=await getLeaderboard()
//       console.log(response)
//       setData(response)
//      }
//   }
//   useEffect(()=>{
//     dataShowhandler()
//   },[activeTab])
//   

//   return (
//     <div className='grid place-items-center w-full h-screen'>
//     <div className='w-[90%] h-[80vh] flex flex-col items-center'>
//       <div className="text-center">
//       <h1>Dashboard page</h1>
//       </div>
//       <div className="flex gap-4">
//         <button onClick={() => setActiveTab('profile')} className='cursor-pointer'>Profile</button>
//         <button onClick={() => setActiveTab('create')} className='cursor-pointer'>Create Withdrawal</button>
//         <button onClick={() => setActiveTab('withdrawalHistory')} className='cursor-pointer'>Withdrawal History</button>
//         <button onClick={() => setActiveTab('addPoints')} className='cursor-pointer'>Add Points</button>
//         <button onClick={() => setActiveTab('deductPoints')} className='cursor-pointer'>Deduct Points</button>
//         <button onClick={() => setActiveTab('pointsHistory')} className='cursor-pointer'>Points History</button>
//         <button onClick={() => setActiveTab('leaderboard')} className='cursor-pointer'>Leaderboard</button>
//       </div>
//       <div className="content">
//         {renderContent()}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Dashboard;
