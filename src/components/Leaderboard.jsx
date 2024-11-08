// import React from 'react';
// import './Leaderboard.css';

// const Leaderboard = () => {
//   return (
//     <div className="leaderboard-container">
//       <main className="leaderboard-main">
//         <div className="leaderboard-header">
//           <h1 className="leaderboard-title"> Interview Champs</h1>
//           <button className="leaderboard-share">
//             <i className="ph ph-share-network"></i>
//           </button>
//         </div>
//         <div className="leaderboard-content">
//           <div className="leaderboard-ribbon"></div>
//           <table className="leaderboard-table">
//             <tbody>
//               <tr className="leaderboard-row">
//                 <td className="leaderboard-cell leaderboard-number">1</td>
//         <td className="leaderboard-cell leaderboard-name">Shivam Dogra</td>
//                 <td className="leaderboard-cell leaderboard-points">
//                   4 interviews
//                   <img
//                     className="leaderboard-gold-medal"
//                     src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
//                     alt="gold medal"
//                   />
//                 </td>
//               </tr>
//               <tr className="leaderboard-row">
//                 <td className="leaderboard-cell leaderboard-number">2</td>
//                       <td className="leaderboard-cell leaderboard-name">Dhariya Desia</td>
//                 <td className="leaderboard-cell leaderboard-points">3 interviews</td>
//               </tr>
//               <tr className="leaderboard-row">
//                 <td className="leaderboard-cell leaderboard-number">3</td>
//                 <td className="leaderboard-cell leaderboard-name">Anisha Miyan</td>
//                  <td className="leaderboard-cell leaderboard-points">2 interviews</td>
//               </tr>
//               <tr className="leaderboard-row">
//                 <td className="leaderboard-cell leaderboard-number">4</td>
//              <td className="leaderboard-cell leaderboard-name">Mansi Patel</td>
//                    <td className="leaderboard-cell leaderboard-points">2 interviews</td>
//               </tr>
//               <tr className="leaderboard-row">
//                 <td className="leaderboard-cell leaderboard-number">5</td>
//                 <td className="leaderboard-cell leaderboard-name">Tushar Karan</td>
//                     <td className="leaderboard-cell leaderboard-points">1 interviews</td>
//               </tr>
//             </tbody>
//           </table>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default Leaderboard;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Leaderboard.css';

// const Leaderboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve the Bearer token
//         const response = await axios.get('http://localhost:3000/api/interview/stats', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Set the Bearer token in the headers
//           },
//         });
//         setData(response.data);
//       } catch (error) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="leaderboard-container">
//       <main className="leaderboard-main">
//         <div className="leaderboard-header">
//           <h1 className="leaderboard-title">Ranking</h1>
//           <button className="leaderboard-share">
//             <i className="ph ph-share-network"></i>
//           </button>
//         </div>
//         <div className="leaderboard-content">
//           <div className="leaderboard-ribbon"></div>
//           <table className="leaderboard-table">
//             <tbody>
//               {data?.topInterviewers.map((interviewer, index) => (
//                 <tr className="leaderboard-row" key={index}>
//                   <td className="leaderboard-cell leaderboard-number">{index + 1}</td>
//                   <td className="leaderboard-cell leaderboard-name">{interviewer._id}</td>
//                   <td className="leaderboard-cell leaderboard-points">
//                     {interviewer.count} Interviews
//                     {index === 0 && (
//                       <img
//                         className="leaderboard-gold-medal"
//                         src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
//                         alt="gold medal"
//                       />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Leaderboard;




import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const users = [
    { id: 1, name: 'Shivam Dogra', points: '4 interviews' },
    { id: 2, name: 'Dhariya Desia', points: '3 interviews' },
    { id: 3, name: 'Anisha Miyan', points: '2 interviews' },
    { id: 4, name: 'Mansi Patel', points: '2 interviews' },
    { id: 5, name: 'Tushar Karan', points: '1 interview' },
  ];

  // Function to get initials from the name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  };

  return (
    <div className="leaderboard-container">
      <main className="leaderboard-main">
        <div className="leaderboard-header">
          <h1 className="leaderboard-title">Interview Champs</h1>
          <button className="leaderboard-share">
            <i className="ph ph-share-network"></i>
          </button>
        </div>
        <div className="leaderboard-content">
          <div className="leaderboard-ribbon"></div>
          <table className="leaderboard-table">
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="leaderboard-row">
                  <td className="leaderboard-cell leaderboard-number">{user.id}</td>
                  <td className="leaderboard-cell leaderboard-name">
                    <div className="leaderboard-initials">
                      {getInitials(user.name)}
                    </div>
                    {user.name}
                  </td>
                  <td className="leaderboard-cell leaderboard-points">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;

