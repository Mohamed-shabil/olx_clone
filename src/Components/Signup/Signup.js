import React,{useReducer,useContext,useState} from 'react';
import {SignupReducers ,Type} from '../../Reducers/SignupReducers'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { firebaseContext} from '../../store/context';
import { useHistory,Link } from 'react-router-dom/cjs/react-router-dom.min';
import {InfinitySpin } from 'react-loader-spinner'
const initialState = {
  name : '',
  email:'',
  phone:'',
  password:'',
}
export default function Signup() {
  const history = useHistory();
  const [state,dispatch] = useReducer(SignupReducers,initialState)
  const [error,setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading,setLoading] = useState(false);
  const {firebase} = useContext(firebaseContext) 
  const handlePhone = (e) => {
    const value = e.target.value;
    const isNumeric = /^[0-9]*$/;
    const isValidLength = value.length === 10;
    const newValue = value.replace(/[^0-9]/g, '');
    setInputValue(newValue);
    if (!isNumeric.test(value)) {
      setError('Please enter only numbers');
    } else if (!isValidLength) {
      setError('Please enter exactly 10 digits');
    } else {
      setError('');
    }
  };
  const handleSignup=(e)=>{
    e.preventDefault();
    setLoading(true);
    firebase.auth().createUserWithEmailAndPassword(state.email,state.password)
    .then((res)=>{
      res.user.updateProfile({displayName:state.name}).then(()=>{
        console.log('Added to data base')
        firebase.firestore().collection('users').add({
          id:res.user.uid,
          name:state.name,
          phone: state.phone
        }
        ).then(()=>{
          console.log('redirect');
          history.push('/login')
        })
      })
    }).catch((err)=>{
      setError(err.message)
      setLoading(false);
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <div className="logo">
          <img width="200px" height="200px" src={Logo}></img>
        </div>
        <p style={{color:'red'}}>{error}</p>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            minLength='3'
            className="input"
            type="text"
            id="fname"
            name="name"
            required
            defaultValue="John"
            onChange={(e)=>{
              dispatch({
                type: Type.change_name,
                payload: e.target.value
              })
            }}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            required
            defaultValue="John"
            onChange={(e)=>{
              dispatch({
                type:Type.change_email,
                payload: e.target.value
              })
            }}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            pattern="[0-9]{10}"
            title='Enter Phone Number'
            className="input"
            type="tel"
            maxLength="10"
            minLength="10"
            id="lname"
            name="phone"
            value={inputValue}
            onChange={(e)=>{
              dispatch({
                type: Type.change_phone,
                payload: e.target.value
              })
              handlePhone(e)
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            onChange={(e)=>{
              dispatch({
                type:Type.change_password,
                payload: e.target.value
              })
            }}
          />
          <br />
          <br />
          {
            loading ? (
              <button >
                <InfinitySpin
                  width='70'
                  color="#4fa94d"
                />
              </button>
            ) : (
              <button onClick={handleSignup}>Signup</button>
            )
          }
          
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
