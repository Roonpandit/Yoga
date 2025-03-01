import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth, googleProvider } from "./firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../box/Navbar";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/user");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/user");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleAuth}>{isLogin ? "Login" : "Signup"}</button>
        {isLogin && <button onClick={handleGoogleLogin}>Login with Google</button>}
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </>
  );
};

export default LoginSignup;
