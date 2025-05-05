// import styles from './styles.module.css';
// import posLogo from './pos-logo.png'; 

// const Main = () => {
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         window.location.href = "/"; // Redirect to home
//     }

//     return (
//         <div className={styles.main_container}>
//          <nav className={styles.navbar}>
//             <div className="logo-container">
//                       <img src={posLogo} alt="Store logo" className="store-logo" />
//                       <span className="store-name">MAM STORES</span>
//                     </div>
//         {/* <h1>MAM Stores</h1>
//         <button className={styles.white_btn} onClick = {handleLogout}>
//         Logout
        
//         </button> */}
 

//  <nav className="pos-nav">
//           <a href="#" className="pos-nav-link active">Log Out</a>
//           <button 
//             className="pos-logout-btn"
//             onClick={handleLogout}
//           >
//             Log Out
//           </button>
//           </div>

//         </nav>
//         </div>
       
//     )
// };
// export default Main;


import styles from './styles.module.css';
import posLogo from './pos-logo.png'; 

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirect to home
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div className="logo-container">
                    <img src={posLogo} alt="Store logo" className="store-logo" />
                    <span className="store-name">MAM STORES</span>
                </div>

                <div className="pos-nav">
                <button 
    className={styles['pos-logout-btn']}
    onClick={handleLogout}
>
    Log Out
</button>
                </div>
            </nav>
        </div>
    )
};

export default Main;