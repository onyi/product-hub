export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const RECEIVE_PUBLISHER_PRODUCTS = 'RECEIVE_PUBLISHER_PRODUCTS';
export const RECEIVE_SINGLE_PRODUCT = 'RECEIVE_SINGLE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const RECEIVE_SEARCH_PRODUCTS = 'RECEIVE_SEARCH_PRODUCTS';

export const RECEIVE_PRODUCT_ERRORS = 'RECEIVE_PRODUCT_ERRORS';
export const CLEAR_PRODUCT_ERRORS = 'CLEAR_PRODUCT_ERRORS';

export const START_LOADING_ALL_PRODUCTS = 'START_LOADING_ALL_PRODUCTS';
export const START_LOADING_PUBLISHER_PRODUCTS = 'START_LOADING_PUBLISHER_PRODUCTS';
export const START_LOADING_PRODUCT = 'START_LOADING_PRODUCT';
export const START_LOADING_PARTIAL_PRODUCTS = 'START_LOADING_PARTIAL_PRODUCTS';

export const FINISH_LOADING_ALL_PRODUCTS = 'FINISH_LOADING_ALL_PRODUCTS';
export const FINISH_LOADING_PUBLISHER_PRODUCTS = 'FINISH_LOADING_PUBLISHER_PRODUCTS';
export const FINISH_LOADING_PRODUCT = 'FINISH_LOADING_PRODUCT';
export const FINISH_LOADING_PARTIAL_PRODUCTS = 'FINISH_LOADING_PARTIAL_PRODUCTS';

export const START_LOADING_UPVOTE = 'START_LOADING_UPVOTE';
export const FINISH_LOADING_UPVOTE = 'FINISH_LOADING_UPVOTE';
export const RECEIVE_PRODUCT_UPVOTE = 'RECEIVE_PRODUCT_UPVOTE'; 

export const CLOSE_PRODUCT_FORM = 'CLOSE_PRODUCT_FORM';
export const OPEN_PRODUCT_FORM = 'OPEN_PRODUCT_FORM';


export const START_CREATING_PRODUCT = 'START_CREATING_PRODUCT';
export const FINISH_CREATING_PRODUCT = 'FINISH_CREATING_PRODUCT';
export const START_UPDATING_PRODUCT = 'START_UPDATING_PRODUCT';
export const FINISH_UPDATING_PRODUCT = 'FINISH_UPDATING_PRODUCT';
export const START_DELETING_PRODUCT = 'START_DELETING_PRODUCT';
export const FINISH_DELETING_PRODUCT = 'FINISH_DELETING_PRODUCT';

import * as ProductApiUtil from '../util/product_api_util';

import * as ProductVoteApiUtil from '../util/product_vote_api_util';

import {
  renderError,
  removeErrorMessage
} from './error_action';

import { addNotification, removeNotification } from './notification_action'; 

export const receiveProducts = (products) => ({
  type: RECEIVE_PRODUCTS,
  products
});
export const receivePublisherProducts = (products) => ({
  type: RECEIVE_PUBLISHER_PRODUCTS,
  products
});

export const receiveSingleProduct = (product) => ({
  type: RECEIVE_SINGLE_PRODUCT,
  product
});

export const receiveSearchProducts = (products) => ({
  type: RECEIVE_SEARCH_PRODUCTS,
  products
});


export const removeProduct = (product) => ({
  type: REMOVE_PRODUCT,
  product
});

export const startLoadingUpvote = (productId) => ({
  type: START_LOADING_UPVOTE,
  productId
});
export const finishLoadingUpvote = (productId) => ({
  type: FINISH_LOADING_UPVOTE,
  productId
});

export const closeProductForm = () => ({
  type: CLOSE_PRODUCT_FORM
});
export const openProductForm = () => ({
  type: OPEN_PRODUCT_FORM
});
export const startCreatingProduct = () => ({
  type: START_CREATING_PRODUCT
});
export const finishCreatingProduct = () => ({
  type: FINISH_CREATING_PRODUCT
});
export const startUpdatingProduct = () => ({
  type: START_UPDATING_PRODUCT
});
export const finishUpdatingProduct = () => ({
  type: FINISH_UPDATING_PRODUCT
});
export const startDeletingProduct = () => ({
  type: START_DELETING_PRODUCT
});
export const finishDeletingProduct = () => ({
  type: FINISH_DELETING_PRODUCT
});

export const startLoadingAllProducts = () => ({
  type: START_LOADING_ALL_PRODUCTS,
  loading: true
});

export const finishLoadingAllProducts = () => ({
  type: FINISH_LOADING_ALL_PRODUCTS,
  loading: false
});

export const startLoadingPartialProducts = () => ({
  type: START_LOADING_PARTIAL_PRODUCTS,
  partialLoading: true
});

export const finishLoadingPartialProducts = () => ({
  type: FINISH_LOADING_PARTIAL_PRODUCTS,
  partialLoading: false
});



export const receiveProductUpvote = (upvoteCount, productId, userId, upvotedProducts, isUpvoted) => ({
  type: RECEIVE_PRODUCT_UPVOTE,
  upvoteCount,
  productId,
  userId,
  upvotedProducts, 
  updateProduct,
  isUpvoted
});

export const receiveProductErrors = (errors, id) => ({
  type: RECEIVE_PRODUCT_ERRORS,
  errors: errors.responseJSON,
  id
});

export const fetchAllProducts = () => dispatch => {
  dispatch(startLoadingAllProducts());
  return ProductApiUtil.fetchAllProducts()
    .then( payload => {
      dispatch(receiveProducts(payload.products));
      dispatch(finishLoadingAllProducts());
    })
    .catch(errors => { dispatch(receiveProductErrors(errors)) } )
};

export const fetchPartialProducts = (offset, limit) => dispatch => {
  dispatch(startLoadingPartialProducts());
  return ProductApiUtil.fetchPartialProducts(offset, limit)
    .then( payload => {
      dispatch(receiveProducts(payload.products));
      dispatch(finishLoadingPartialProducts());
    })
    .catch(errors => { dispatch(receiveProductErrors(errors)) } )
};


export const fetchProductsByPublisher = (publisherId) => dispatch => {
  dispatch({ type: START_LOADING_PUBLISHER_PRODUCTS, loading: true });
  return ProductApiUtil.fetchProductByPublisher(publisherId)
    .then( payload => {
      dispatch(receivePublisherProducts(payload.products));
      dispatch({ type: FINISH_LOADING_PUBLISHER_PRODUCTS });
    })
    .catch(errors => { dispatch(receiveProductErrors(errors)) } )
};

export const fetchProduct = (id) => dispatch => {
  dispatch({ type: START_LOADING_PRODUCT, loading: true });
  return ProductApiUtil.fetchProduct(id)
    .then( product => {
      dispatch(receiveSingleProduct(product));
      dispatch({ type: FINISH_LOADING_PRODUCT });
    })
    .fail(errors => { dispatch(receiveProductErrors(errors)) } )
    // .always(dispatch({ type: FINISH_LOADING_PRODUCT })
  };

export const createUpvote = (productId) => dispatch => {
  dispatch(startLoadingUpvote(productId));
  return ProductVoteApiUtil.postUpvote(productId)
    .then( productVote => {
      dispatch(
        receiveProductUpvote(
          productVote.upvotes,
          productVote.product_id,
          productVote.user_id,
          productVote.upvotedProducts,
          productVote.isUpvoted
        )
      );
      dispatch(finishLoadingUpvote(productId));
    })
    .catch( errors => dispatch(receiveProductErrors(errors)))
};

export const deleteUpvote = (productId) => dispatch => {
  dispatch(startLoadingUpvote(productId));
  return ProductVoteApiUtil.deleteUpvote(productId)
    .then( productVote => {
      dispatch(
        receiveProductUpvote(
          productVote.upvotes,
          productVote.product_id,
          productVote.user_id,
          productVote.upvotedProducts,
          productVote.isUpvoted
        )
      );
      dispatch(finishLoadingUpvote(productId));
    })
    .catch( errors => dispatch(receiveProductErrors(errors)))
};

const randomNumber = (length) => {
  return Math.floor(Math.random() * length)
}

export const createProduct = (product) => dispatch => {
  dispatch(startCreatingProduct());
  return ProductApiUtil.postProduct(product)
    .then( product => {
      // console.log(`Response product: ${JSON.stringify(product)} `)
      dispatch(receiveSingleProduct(product));
      dispatch(addNotification("Created product successfully!", randomNumber(4) ));
      dispatch(finishCreatingProduct());
      dispatch(closeProductForm());
    })
    .catch( errors => {
      let errorMsg = errors.responseJSON;
      // console.log(`errors responseJSON: ${JSON.stringify(errorMsg)}`)
      // dispatch(receiveProductErrors(errors));
      // errorMsg.forEach(error => {
      //   console.log(`Error: ${error}`)
      //   dispatch(renderError(error), randomNumber(5))
      // }
      // );
      dispatch(renderError(errorMsg, randomNumber(5)));
      dispatch(finishCreatingProduct());
    })
};

export const updateProduct = (product) => dispatch => {
  dispatch(startUpdatingProduct());
  return ProductApiUtil.updateProduct(product)
    .then( product => {
      dispatch(receiveSingleProduct(product));
      dispatch(addNotification("Update product successfully!", randomNumber(4) ));
      dispatch(finishUpdatingProduct());
      dispatch(closeProductForm());
    })
    .catch( errors => {
      let errorMsg = errors.responseJSON;
      dispatch(renderError(errorMsg, randomNumber(5)));
      dispatch(finishUpdatingProduct());
    })
};

export const deleteProduct = (productId) => dispatch => {
  dispatch(startDeletingProduct());
  return ProductApiUtil.deleteProduct(productId)
    .then( product => {
      dispatch(removeProduct(product));
      dispatch(addNotification("Delete product post successfully!", randomNumber(4) ));
      dispatch(finishDeletingProduct());
    })
    .catch( errors => {
      let errorMsg = errors.responseJSON;
      dispatch(renderError(errorMsg, randomNumber(5)));
      dispatch(finishDeletingProduct());
    })
};


export const searchProduct = (keyword, offset, limit) => dispatch => {
  console.dir(`search action`);
  dispatch(startLoadingAllProducts());
  return ProductApiUtil.searchProduct(keyword, offset, limit)
    .then( payload => {
      dispatch(receiveSearchProducts(payload.products));
      dispatch(finishLoadingAllProducts());
    })
    .catch( errors => {
      let errorMsg = errors.responseJSON;
      dispatch(renderError(errorMsg, randomNumber(5)));
      dispatch(finishLoadingAllProducts());
    })
}