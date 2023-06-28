import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import style from './Product.module.css'
import Cookies from 'js-cookie';

export default function Product() {
  const [product, setProduct] = useState({});
  const params = useParams();
  console.log(params.id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${params.id.slice(1)}`
      );
      const data = await response.json();
      setProduct(data);
    };
    fetchData();
  }, []);
  console.log(product);
  const isAuthenticated = () => {
    const accessToken = Cookies.get('allUserData');
    return !!accessToken; // Check if access token exists
  };

  if (!isAuthenticated()) {
    navigate('/login'); // Redirect to the login page or appropriate route
    return null; // Render nothing if not authenticated
  }
  return (
    <div className={style.Container} >
      <Navbar />
      <div className={style.card}>
      <h3>{product.title}</h3>
      <img src={product.image} height ="250px" />
      <p>Price : ${product.price} </p>
      <p>description:{product.description}</p>
      <p>rate:{product.rating?.rate}</p>
    </div>
    </div>
  );
}

