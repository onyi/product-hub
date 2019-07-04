import React from 'react';

import { Modal } from '../../util/modal_util'

import { withRouter } from 'react-router-dom';

import { toast } from 'react-toastify';


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      show: props.show
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }

  componentWillUnmount() {
    console.log(`Component will unmount`);
    this.props.removeSessionErrors();
  }

  update(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    if (this.props.errors.length != 0)
      this.props.removeSessionErrors();
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal(e) {
    e.stopPropagation();
    this.setState({ session: { show: false, errors: [] } });
    this.props.removeSessionErrors();
    this.props.history.goBack();
  }

  renderError() {
    this.props.errors.forEach(error => {
      toast.error(error);
    });
  }

  render() {
    this.renderError();
    return (
      <Modal show={this.props.session.show} handleClose={this.hideModal} >
        <div className="login-form">
          <h2>This is a login form</h2>
          <div className="login-form-content">
            <form onSubmit={this.handleSubmit}>
              <label>Username: </label>
              <input type="text" value={this.state.username} onChange={this.update} name="username" />
              <label>Password: </label>
              <input type="password" value={this.state.password} onChange={this.update} name="password" />
              <input type="submit" value="Sign In" />
            </form>
          </div>
        </div>
      </Modal>
    )

  }

}

export default withRouter(Login);