// import React, { useState } from "react";
// import WarnOnPageLeave from "./components/WarnOnPageLeave";
// import { endGameSession } from "../../api/gameSessionApi";

// function Game() {
//   const [sessionEnded, setSessionEnded] = useState(false);

//   const handleConfirmLeave = async () => {
//     const sessionData = {
//       PlayerId: getAuthUserId(),
//       Level: level,
//       SessionScore: score,
//     };
//     await endGameSession(sessionData);
//     setSessionEnded(true);
//   };

//   return (
//     <div>
//       <WarnOnPageLeave onConfirmLeave={handleConfirmLeave} />
//       {/* The rest of your Game component code */}
//       hehe
//     </div>
//   );
// }

// export default Game;
