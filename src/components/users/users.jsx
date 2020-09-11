import React from 'react';
import Paginator from '../paginator/paginator';
import User from './user';
import styles from './users.module.css';

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

      return (
        <div>
             <div className={styles.paginator}>
                 <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                            totalItemsCount={totalUsersCount} pageSize={pageSize} />
             </div>
          <div className={styles.page_row}>
          <div className={styles.page_cell}>
             <div className={styles.users_panel}>
                 {
                   users.map(u => <User user={u} key={u.id} />)
                 }
             </div>
          </div>
          </div>
     </div>
     )
  }

export default Users;
