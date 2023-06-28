import React from 'react';
import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
export default function Navbar({ search, setSearch }) {
  return (
    <div className={style.container}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      <Link to="/home">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/favourite">Favourite</Link>
    </div>
  );
}
