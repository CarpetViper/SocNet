import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
<div className={styles.navbar_row}>
    <div className={styles.navbar_cell}>
         <div className={styles.navbar_item}>
             <NavLink to ='/profile' activeClassName={styles.activeLink}>Profile</NavLink>
         </div>
         <div className={styles.navbar_item}>
             <NavLink to ='/users' activeClassName={styles.activeLink}>Users</NavLink>
         </div>
    </div>
  </div>
  )
}

export default Navbar;
