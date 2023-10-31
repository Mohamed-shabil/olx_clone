import React from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useState,useContext} from 'react';
import {InfinitySpin} from 'react-loader-spinner'
import { Link,useHistory } from 'react-router-dom/cjs/react-router-dom';
import { firebaseContext } from '../../store/context'
function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const {firebase} = useContext(firebaseContext)
  const history = useHistory();
  const handleLogin =(e)=>{
    e.preventDefault();
    setLoading(true)
    console.log(email,password)
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
       history.push('/')
    }).catch((err)=>{
      console.log(err);
      setError(err.message)
      setLoading(false)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <div className="logo">
          <img width="200px" height="200px" src={Logo}></img>
        </div>
        <p style={{color:'red'}}>{error}</p>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="123"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          {
            loading ? (
              <button >
                <InfinitySpin 
                  width='100'
                  color="#4fa94d"
                />
              </button>
            ) : (
              <button onClick={handleLogin}>Login</button>
            )
          }
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
