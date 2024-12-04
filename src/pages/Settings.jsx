// import { useEffect } from "react";
// import VolumeControl from "./components/VolumeControl";
// import { useNavigate } from "react-router-dom";
// import { useLogout } from "../hooks/useLogout";
// import { toast } from "react-toastify";

// function Settings({ audioRef, isPlaying, togglePlay, volume, setVolume }) {
//   const navigate = useNavigate();
//   const logout = useLogout();

//   // Display the current volume in toast on volume change
//   useEffect(() => {
//     toast.info(`Current Volume: ${Math.round(volume * 100)}%`);
//   }, [volume]); // Only run when volume changes

//   const goToLeaderboard = () => {
//     navigate("/leaderboard");
//   };

//   const goToStats = () => {
//     navigate("/stats");
//   };

//   const goToStart = () => {
//     navigate("/");
//   };

//   return (
//     <div
//       className="flex flex-row w-screen h-screen border-2 bg-cover bg-center align-middle justify-center items-center life-savers-regular"
//       style={{
//         backgroundImage: `url('/background-elements/stats-bg.png')`,
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="w-[75%] h-[75%] bg-[#ffffffe2] p-10">
//         <h1 className="metrophobic-regular text-4xl text-center text-[#776300] ">
//           Banana Game
//         </h1>
//         <div className="flex flex-row h-full w-full justify-center align-middle p-8 rounded-lg ">
//           <div className="flex-1 flex flex-col flex-grow align-middle w-full">
//             {/* Pass props to VolumeControl */}
//             <VolumeControl volume={volume} setVolume={setVolume} />


//             <div className="flex items-center justify-center space-x-6">
//               <img
//                 className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
//                 src="/icons/hugeicons--logout-circle-01.png"
//                 alt="Guidance Icon"
//                 onClick={logout}
//               />
//               <img
//                 className="w-24 h-24 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
//                 src="/icons/material-symbols-light--social-leaderboard-outline-rounded.png"
//                 alt="Leaderboard Icon"
//                 onClick={goToLeaderboard}
//               />
//               <img
//                 className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
//                 src="/icons/guidance--user-1.png"
//                 alt="Settings Icon"
//                 onClick={goToStats}
//               />
//               <button onClick={togglePlay} className="m-auto">
//                 {isPlaying ? (
//                   <img
//                     className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
//                     src="/icons/akar-icons--sound-off.png"
//                     alt="Guidance Icon"
//                   />
//                 ) : (
//                   <img
//                     className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
//                     src="/icons/akar-icons--sound-on.png"
//                     alt="Guidance Icon"
//                   />
//                 )}
//               </button>
//             </div>
//             <button
//               className="p-3 bg-black justify-center text-white rounded-full life-savers-regular flex h-fit text-2xl hover:scale-110 transition-transform duration-500"
//               onClick={goToStart}
//             >
//               <img src="/icons/image.png" className="w-8 h-8" alt="5" /> Back to
//               Game
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;
