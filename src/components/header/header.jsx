import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './header.module.css';

const Header = (props) => {
  return (
  <div className={styles.header_row}>
    <div className={styles.header_cell}>
        <div className={styles.logo}>
            <a href='./'>Home</a>
        </div>
        <div className={styles.loginlogout}>
            { props.isAuth
              ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
              : <NavLink to={'/login'}>Login</ NavLink> }
        </div>
     </div>
   </div>
  );
}

export default Header;
