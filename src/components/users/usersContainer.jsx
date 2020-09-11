import React from 'react';
import {connect} from 'react-redux';
import {setCurrentPage, requestUsers} from '../../redux/usersReducer';
import Users from './users';
import Preloader from '../preloader/preloader';
import {Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {getCurrentPage, getIsFetching,
        getPageSize, getTotalUsersCount,
        getUsersSuperSelector, getUsers} from '../../redux/usersSelectors';


class UsersContainer extends React.Component {

  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
     const {pageSize} = this.props;
     this.props.getUsers(pageNumber, pageSize);
  }

  render() {
    return (
      <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged}
             users={this.props.users}
            />
      </>
    )
  }
}

let mapStateToProps = (state) => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state)
    }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps,{setCurrentPage, getUsers: requestUsers}))(UsersContainer)
