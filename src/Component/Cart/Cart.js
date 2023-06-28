import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import style from "./Cart.module.css"

export default function Cart() {
  const cartItem = useSelector((state) => state.reducerCart);
  const [item, setItem] = useState([]);

  useEffect(() => {
    setItem(cartItem);
  }, [cartItem]);

  const isAuthenticated = () => {
    const accessToken = Cookies.get('allUserData');
    return !!accessToken; // Check if access token exists
  };

  if (!isAuthenticated()) {
    navigate('/login'); // Redirect to the login page or appropriate route
    return null; // Render nothing if not authenticated
  }
  const dispatch = useDispatch();
  console.log('cartItem', cartItem);
  return (
    <>
    < div className={style.main}>
      <Navbar />
      <table border="1px solid">
        <th>Image</th>
        <th>Name</th>
        <th>Price/Qty</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Action</th>
        {item.map((el) => {
          return (
            <tr>
              <td>
                <img width="50px" src={el.image} />
              </td>
              <td>{el.title}</td>
              <td>{el.price}</td>
              <td>
                <>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch({ type: 'DELETE_CART', payload: el });
                      // handleDecrease(e);
                    }}
                  >
                    {'➖'}
                  </button>
                  <p>{el.qty}</p>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch({ type: 'ADD_CART', payload: el });
                      // handleIncrease(e);
                    }}
                  >
                    {'➕'}
                  </button>
                </>
              </td>
              <td>{(+el.price * +el.qty).toFixed(2)}</td>
              <td
                onClick={() =>
                  dispatch({ type: 'ITEM_REMOVE_CART', payload: el })
                }
              >
                {'⛔'}
              </td>
            </tr>
          );
        })}
        <p>
          TOTAL AMOUNT :{' '}
          {item.reduce((total, el) => total + el.price * el.qty, 0).toFixed(2)}
        </p>
      </table>
      </div>
    </>
  );
}
