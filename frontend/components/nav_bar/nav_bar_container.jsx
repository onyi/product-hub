import { connect } from "react-redux";

import {logoutUser} from '../../actions/session_action';

import NavBar from './nav_bar';


const msp = state => ({
    currentUser: state.entities.users[state.session.currentUserId]
  });


const mdp = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    getUser: (id) => dispatch(getUser(id)),
  }
};

export default connect(msp, mdp)(NavBar);