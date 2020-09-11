import React, {Component} from 'react';
import HeaderContainer from './components/header/headerContainer';
import Navbar from './components/navbar/navbar';
import Login from './components/login/login';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {initializeApp} from './redux/appReducer';
import {compose} from 'redux';
import Preloader from './components/preloader/preloader';
import {BrowserRouter} from 'react-router-dom';
import store from './redux/reduxStore';
import {Provider} from 'react-redux';
import {withSuspense} from './hoc/withSuspense';
import Description from './components/description/description';


const UsersContainer = React.lazy(() => import('./components/users/usersContainer'));
const ProfileContainer = React.lazy(() => import('./components/profile/profileContainer'));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
    render() {
      if(!this.props.initialized) {
        return <Preloader />
      }
      return (
                <div>
                     <HeaderContainer />
                     <Navbar />
                     <div>
                         <Switch>
                          <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
                          <Route path='/users' render={withSuspense(UsersContainer)} />
                          <Route path='/login' render={ () => <Login />} />
                          <Route path='*' render={ () => <Description/>} />
                         </Switch>
                     </div>
                </div>
      )
   }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialNetApp = (props) => {
  return <BrowserRouter>
     <Provider store={store}>
          <AppContainer />
     </Provider>
  </BrowserRouter>
}

export default SocialNetApp;
