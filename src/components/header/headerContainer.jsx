import React from 'react';
import Header from './header';
import {connect} from 'react-redux';
import {logout} from '../../redux/authReducer';
import styles from './header.module.css';

class HeaderContainer extends React.Component {

  render() {
     return (
        <div>
             <Header {...this.props} />
        </div>
     );
  }
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
});

export default connect(mapStateToProps,
  {logout})(HeaderContainer);
