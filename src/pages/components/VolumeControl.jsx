// function VolumeControl({ volume, setVolume }) {
//   const handleVolumeChange = (event) => {
//     const newVolume = parseFloat(event.target.value);
//     setVolume(newVolume);
//   };

//   return (
//     <div>
//       <label>Volume: {Math.round(volume * 100)}%</label>
//       <input
//         type="range"
//         min="0"
//         max="1"
//         step="0.01"
//         value={volume}
//         onChange={handleVolumeChange}
//         className="w-full"
//       />
//     </div>
//   );
// }

// export default VolumeControl;
