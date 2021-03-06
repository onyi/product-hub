import React from 'react';

import {Modal} from '../../util/modal_util';

import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      show: props.show,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentDidUpdate(prevProps){
    // console.log(`Component updated, ${JSON.stringify(this.state.error)}`);
    if (this.props.errors.length != 0)
      this.props.removeSessionErrors();
  }

  componentWillUnmount(){
    // console.log(`Component will unmount`);
    this.props.removeSessionErrors();

  }

  handleSubmit(e){
    e.preventDefault();
    this.props.signupUser(this.state);
  }

  update(e){
    this.setState({ [e.currentTarget.name] : e.currentTarget.value });

  }

  showModal(e){
    this.setState({ show: true })
  }

  hideModal(e){
    e.stopPropagation();
    this.setState({ session: { show: false, errors: [] }});
    this.props.removeSessionErrors();
    this.props.history.goBack();
  }

  renderError(){
    this.props.errors.forEach( error => {
      toast.error(error);
    });
  }

  render() {
    this.renderError();
    return (
      <Modal show={this.props.session.show} handleClose={this.hideModal} >
        <div className="session-form">
          <h2>Sign Up</h2>
          <div className="session-form-wrapper">
            <form onSubmit={this.handleSubmit} className="session-form-element">
              <div className="field cf">
                <input type="text" value={this.state.username} onChange={this.update} name="username" placeholder="Username" />
              </div>
              <div className="field cf">
                <input type="password" value={this.state.password} onChange={this.update} name="password" placeholder="Password" />
              </div>
              <div className="field cf">
                <input type="text" value={this.state.email} onChange={this.update} name="email" placeholder="Email" />
              </div>
              <div className="cf buttons">
                <input type="submit" value="Sign Up" className="button" />
                <Link to={'/login'} replace >log in instead</Link>
              </div>
            </form>

          </div>
        </div>

      </Modal>
    )
  }

}

export default withRouter(Signup);