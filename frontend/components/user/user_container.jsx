import User from './user';
import { getUser, updateUser, removeUserErrors } from '../../actions/user_action';

import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';

import { addNotification } from '../../actions/notification_action'

import { 
  fetchProductsByPublisher,
  deleteProduct
} from '../../actions/product_action';

const msp = (state = {}, ownProps) => {
  let userId = ownProps.match.params.userId;
  let user = state.entities.users[userId] || {
    username: '',
    email: '',
    website: '',
    headline: '',
    profile_img: ''
  };
  let errors = state.errors.user;
  let products = state.entities.users[userId].publishedProducts ? Object.values(state.entities.products).filter( 
    product => state.entities.users[userId].publishedProducts.includes(product.id)
  ) : [];
  let loading = state.ui.loading.product.publishedProductLoading
  return { userId, user, errors, products, loading };
};

const mdp = dispatch => ({
  getUser: (id) => dispatch(getUser(id)),
  updateUser: (user) => dispatch(updateUser(user)),
  removeUserErrors: () => dispatch(removeUserErrors()),
  addNotification: (message) => dispatch(addNotification(message)),
  getUserProducts: (publisherId) => dispatch(fetchProductsByPublisher(publisherId)),
  deleteProduct: (id) => dispatch(deleteProduct(id)),

});

export default withRouter(connect(msp, mdp)(User));