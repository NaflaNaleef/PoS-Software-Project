// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import styles from './styles.module.css';
// import { useNavigate } from 'react-router-dom';
// import posLogo from './pos-logo.png'; 


// const Login  = ({onClose }) => {
//     const [data, setData] = useState({
       
//         email: "",
//         password: ""
//     });
//     const[error,setError]=useState("")
//     const navigate = useNavigate();
    
//     const handleChange = ({ currentTarget: input }) => {
//         setData({ ...data, [input.name]: input.value });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try{
//             const url = "http://localhost:3000/api/auth";
//             const{data:res}=await axios.post(url,data);
//             localStorage.setItem("token",res.data);
//             navigate("/dashboard"); 
//         }catch (error){
//             if(error.response &&
//                error.response.status >=400 &&
//                error.response.status<=500
//             ){
//                 setError(error.response.data.message)

//             }

//         }
//     }
//     return (
        







        
//         <div className={styles.login_container}>
//             <div className={styles.login_form_container}>
            
//                 <div className={styles.left}>
//                 <form className={styles.form_container} onSubmit={handleSubmit}>
//                         <h1>Login to Your Account</h1>
                        
//                         <input
//                             type="email"
//                             placeholder='Email'
//                             name='email'
//                             onChange={handleChange}
//                             value={data.email}
//                             required
//                             className={styles.input}
//                         />
//                         <input
//                             type="password"
//                             placeholder='Password'
//                             name='password'
//                             onChange={handleChange}
//                             value={data.password}
//                             required
//                             className={styles.input}
//                         />
//                         {error &&<div className={styles.error_msg}>{error}</div>}
//                         <button type="submit" className={styles.green_btn}>
//                             Sign In

//                         </button>




//                     </form>   
//                 </div>
//                 <div className={styles.right}>
//                     <h1>New Here?</h1>
//                     <Link to="/signup">
//                     <button type="button" className={styles.white_btn}>
//                         Sign up

//                     </button>
//                     </Link>
                    
//                 </div>
//             </div>
//         </div>
//     )
// };
// export default Login;






import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import posLogo from '../../assets/pos-logo.png'; // Adjusted path

const Login = ({ onClose }) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("")
    const navigate = useNavigate();
    
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3000/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            navigate("/dashboard"); 
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    
    return (
        <div>
            {/* Added Header directly */}
            <header className="pos-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                <div className="logo-container" style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <img src={posLogo} alt="Store logo" className="store-logo" style={{
                        height: '40px',
                        marginRight: '10px'
                    }} />
                    <span className="store-name" style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>MAM STORES</span>
                </div>

                <nav className="pos-nav" style={{
                    display: 'flex',
                    gap: '20px'
                }}>
                    <Link to="/" className="pos-nav-link active" style={{
                        textDecoration: 'none',
                        color: '#333',
                        fontWeight: '500',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px'
                    }}>Home</Link>
                </nav>
            </header>

            {/* Original Login Content */}
            <div className={styles.login_container}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>Login to Your Account</h1>
                            <input
                                type="email"
                                placeholder='Email'
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />
                            <input
                                type="password"
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn}>
                                Sign In
                            </button>
                        </form>   
                    </div>
                    <div className={styles.right}>
                        <h1>New Here?</h1>
                        <Link to="/signup">
                            <button type="button" className={styles.white_btn}>
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;