import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import Navbar from '../box/Navbar';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/user");
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
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
    </>
  );
};

export default Login;
