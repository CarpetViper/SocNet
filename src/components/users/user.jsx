import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../img/user.png';
import {NavLink} from 'react-router-dom';

let User = ({user}) => {
  return (
          <div className={styles.user}>
                <span>
                      <div>
                          <NavLink to={'/profile/' + user.id}>
                           <img src={user.photos.small != null
                             ? user.photos.small
                             : userPhoto} className={styles.userPhoto}
                          />
                          </NavLink>
                      </div>
                </span>
              <span>
                <span>
                      <div className={styles.user_name}>{user.name}</div>
                      <div className={styles.user_status}>{user.status}</div>
                </span>
              </span>
          </div>
        )
}

export default User;
