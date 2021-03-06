import React from 'react';

import ProductIndexItem from '../product/product_index_item';

import LoadingIcon from '../loading_icon';

import ProductDetailContainer from '../product/product_detail_container';

class User extends React.Component {

  constructor(props){
    super(props);
    // this.user = this.props.user || {};
    this.state = this.props.user;
    this.setState({
      modalOpen: false,
      productToShow: null
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.fetchProfileImage = this.fetchProfileImage.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.showProductDetail = this.showProductDetail.bind(this);
  }

  fetchProfileImage(){
    // this.props.fetchProfileImage()

    // $.ajax({
    //   url: 'https://randomuser.me/api/',
    //   dataType: 'json',
    // }).then( )
  }

  componentDidUpdate(prevProps){
    if (this.props.errors.length != 0){
      this.props.removeSessionErrors();
    }
    if(this.props.user !== prevProps.user){
      Object.keys(this.props.user).forEach( key => {
        this.setState({ [key]: this.props.user[key] })
      });
    }
  }

  componentWillMount(){
    // this.props.getUser(this.props.userId);
  }

  componentDidMount(){
    this.props.getUser(this.props.userId);
    this.props.getUserProducts(this.props.userId);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.updateUser(this.state);
  }

  update(e){
    // console.log(`User form upate ${JSON.stringify(this.state)}`);
    this.setState({ [e.currentTarget.name] : e.currentTarget.value })
  }

  renderError() {
    this.props.errors.forEach((error, idx) => {
      toast(error,
        {
          type: toast.TYPE.ERROR,
          onClose: () => {
            this.props.removeSessionErrors();
          }
        });
    });
  }


  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this.setState({ profile_img: fileReader.result, imageFile: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ profile_img: "", imageFile: null });
    }
  }

  showProductDetail(productId){
    console.log(`Detail clicked`);
    if(this.state.modalOpen){
      this.setState({
        modalOpen: false,
        productToShow: null
      })
    }else{
      this.setState({
        modalOpen: true,
        productToShow: productId
      })
    }

  }

  render(){
    // console.log(`Render state: ${ JSON.stringify(this.state) }`)
    this.renderError();
    const { products, user, deleteProduct } = this.props;
      
    if (this.props.loading) {
      return (<LoadingIcon />)
    }

    const profilePicture = this.state.profile_img ?
      <img className="product-preview-img" src={this.state.profile_img}></img> : <i className="fas fa-radiation-alt"></i>;

    return (
      <div className="user-profile">
        <div className="user-profile-wrapper">
          
          <h1>User Profile</h1>
          <form className="user-profile-form" onSubmit={this.handleSubmit}>
            <div className="field cf">
              <h3>Update Profile Image</h3>
              <div className="user-profile-img">

                <div className="button-holder">
                  {profilePicture}
                  <h3>Profile Image</h3>
                  <input type="file" className="add-image-button" name="header_img" onChange={this.handleFile.bind(this)} />
                </div>

                <hr />


                {/* <i className="fas fa-radiation-alt"></i> */}
              </div>

            </div>
            <div className="field cf">
              <label>Username</label>
              <input type="text" value={this.state.username} name="username" placeholder="Username" disabled />
              
            </div>
            <div className="field cf">
              <label>Email</label>
              <input type="text" value={this.state.email} name="email" placeholder="email" onChange={this.update} />
            </div>
            <div className="field cf">
              <label>Website</label>
              <input type="text" value={this.state.website} name="website" placeholder="website" onChange={this.update} />
            </div>
            <div className="field cf">
              <label>Headline</label>
              <input type="text" value={this.state.headline} name="headline" placeholder="headline" onChange={this.update} />
            </div>
            <div className="field cf buttons">
              <input type="submit" value="Update Profile" className="button" />
            </div>
          </form>
        </div>
        <div className="user-products-wrapper">
          <h1>{products.length} Published Product{products.length > 1 ? "s" : ""}</h1>
          <ul className="product-list-index">
            {products.map(
              product =>
                <ProductIndexItem
                  key={product.id}
                  product={product}
                  productId={product.id}
                  editable={true}
                  deleteProduct={deleteProduct}
                  showProductDetail={this.showProductDetail}
                />
            )}
          </ul>
        </div>
        { this.state.modalOpen ? <ProductDetailContainer productId={this.state.productToShow} onClose={this.showProductDetail} /> : ""}
      </div>
    );
  }



}


export default User;