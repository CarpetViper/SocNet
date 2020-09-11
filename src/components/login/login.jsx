import React from 'react';
import {reduxForm} from 'redux-form'
import {required} from '../../helpers/validators/validator';
import {Input, createField} from '../formsControls/formsControls';
import {connect} from 'react-redux';
import {login} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';
import styles from './login.module.css';

const LoginForm = ({handleSubmit, error, captchaUrl}) => {

  return (
    <div>
        <form onSubmit={handleSubmit}>
               {createField('Email', 'email', [required], Input)}
               {createField('Password', 'password', [required], Input, {type: 'password'})}
               {createField(null, 'rememberMe', [], Input, {type: 'checkbox'})}

               {captchaUrl && <img src={captchaUrl} />}
               {captchaUrl && createField('Simbols from image', 'captcha', [required], Input, {})}

               {error && <div>{error}</div> }
               <div>
                   <button>Login</button>
               </div>
        </form>
   </div>
   )
}

const ReduxLoginForm  = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if(props.isAuth) {
    return <Redirect to={'/profile'} />
  }

  return (
    <div  className={styles.login_row}>
        <div  className={styles.login_cell}>
        <h1 className={styles.headLine}>Login</h1>
        <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login} )(Login);
