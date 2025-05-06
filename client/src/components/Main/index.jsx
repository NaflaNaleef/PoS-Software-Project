

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