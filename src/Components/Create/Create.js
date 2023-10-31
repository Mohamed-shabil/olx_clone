import React, { Fragment, useContext, useReducer,useState} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { createReducer } from '../../Reducers/createReducer';
import { Type } from '../../Reducers/createReducer';
import {firebaseContext,AuthContext} from '../../store/context'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import {InfinitySpin} from 'react-loader-spinner'

const initialState = {
  name: '',
  category: '',
  price:'',
  image : null
}
const Create = () => {
  const {firebase} = useContext(firebaseContext)
  const {user} = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const [state,dispatch] = useReducer(createReducer,initialState);
  const date = new Date();
  const history = useHistory();
  const handleSubmit = ()=>{
    setLoading(true);
    firebase.storage().ref(`/image/${state.image.name}`).put(state.image)
    .then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url)
        firebase.firestore().collection('products').add({
          name: state.name,
          catregory: state.category,
          price:state.price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        }).then(()=>{
          history.push('/')
        })
      })
    }).catch((err)=>{
      setLoading(false)
      console.log(err)
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              onChange={(e)=>{
                dispatch({
                  type: Type.change_name,
                  payload:e.target.value
                })
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              onChange={(e)=>{
                dispatch({
                  type: Type.chanage_category,
                  payload:e.target.value
                })
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              id="fname" 
              name="Price" 
              onChange={(e)=>{
                dispatch({
                  type: Type.change_price,
                  payload:e.target.value
                })
              }}
              />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={
            state.image ? URL.createObjectURL(state.image) : ''
          }></img>
  
            <br />
            <input type="file" 
              onChange={(e)=>{
                dispatch({
                  type:Type.change_image,
                  payload:e.target.files[0]
                })
              }}
            />
            <br />
            {
            loading ? (
              <button 
                className="uploadBtn"
              >
                <InfinitySpin 
                  width='100'
                  color="#4fa94d"
                />
              </button>
            ) : (
              <button 
                className="uploadBtn"
                onClick={handleSubmit}
              >upload and Submit</button>
            )
          }
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
