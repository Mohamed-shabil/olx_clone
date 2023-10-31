import React, {useEffect,useContext,useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { firebaseContext } from '../../store/context';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { RotatingLines } from 'react-loader-spinner';
function Posts() {
  const history = useHistory();
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
  const {firebase} = useContext(firebaseContext)
  const {setPostDetails} = useContext(PostContext)
  useEffect(()=>{
    setLoading(true)
    firebase.firestore().collection('products').get().then((snapshot)=>{
      const allPost = snapshot.docs.map((product)=>{
        return {
          ...product.data(),
          id:product.id
        }
      })
      setProducts(allPost)
      setLoading(false)
    })
  },[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className={`cards ${loading}`}>
          {
            loading ? ( 
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.5"
                width="50"
                visible={true}
              />
            ) : (
              products.map((product)=>(
              <div className="card" 
                onClick={()=>{
                  setPostDetails(product)
                  history.push('/view')
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
              ))
            ) 
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
