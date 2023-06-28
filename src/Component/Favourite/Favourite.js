import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import style from './favourite.module.css'
import Cookies from 'js-cookie'

export default function Favourite() {
  const favItem = useSelector((state) => state.reducerFav);
  const cartItem = useSelector((state) => state.reducerCart);
  const dispatch = useDispatch();
  console.log('cartItem', favItem);

  const isAuthenticated = () => {
    const accessToken = Cookies.get('allUserData');
    return !!accessToken; // Check if access token exists
  };

  if (!isAuthenticated()) {
    navigate('/login'); // Redirect to the login page or appropriate route
    return null; // Render nothing if not authenticated
  }

  return (
    <>
     <div className={style.Container}>
      <Navbar />
      {favItem.map((el) => (
        <>
          <div className={style.card}>
            <img src={el.image} height='150px'/>
            <div className={style.content} >
            <div className={style.title}>{el.title}</div>
            <div className={style.description}>{el.description}</div>
            <div className={style.price}>${el.price}</div>
            
          
            <button
              onClick={() => dispatch({ type: 'DELETE_FAV', payload: el })}
              className={style.btn}
            >
              Remove
            </button>
            {!cartItem.some((item) => item.id === el.id) ? (
              <button
                onClick={() => dispatch({ type: 'ADD_CART', payload: el })}
                className={style.btn}
              >
                Add to Cart
              </button>
            ) : (
              <button
              className={style.btn}
                onClick={() =>
                  dispatch({ type: 'ITEM_REMOVE_CART', payload: el })
                }
              >
                Remove from Cart
              </button>
            )}
            </div>
          </div>
        </>
      ))}
    </div>
    </>
  );
}
