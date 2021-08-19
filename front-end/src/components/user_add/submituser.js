import React, { Component } from 'react';
import { VscClose } from "react-icons/vsc";
import ReactModal from 'react-modal';
import validator from 'validator';
import axios from 'axios';

const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '0px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
}; // Referenced around line 200-220

/** Submituser
 *  Creates the option to submit a user with a modal menu.
 */
class Submituser extends Component {
    constructor () {
      super();
      this.state = {
        showModal: false,
        submitted: null,
        submissionStatus: null
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        this.setState({submitted: false, 
                        submissionStatus: '' });
    }

    componentWillUnmount() {
        this.setState({ submitted: null, 
                        submissionStatus: null });
    }

    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false, 
                      submitted: false });
    }
    
    render () {
      let submitForm;
      if(this.state.submitted === false){
            submitForm =    <div class="mt-3 mb-3 ps-5 pe-5">
                              <div class="container">
                                  <div class="row">
                                      <div class="col-lg-6 mt-1 mb-1">
                                          <label for="userName" class="form-label">
                                              Enter Name: 
                                          </label>
                                          <input type="text" class="form-control" 
                                              id="userName" />
                                          <label for="userName" class="form-label mt-2" 
                                                 id="nameerrors">
                                              <sup>
                                                  Must only use letters. Must be less than 156 characters.
                                              </sup>  
                                          </label>
                                      </div>
                                      <div class="col-lg-6 mt-1 mb-1">
                                          <label for="userMail" class="form-label">
                                              Enter E-mail: 
                                          </label>
                                          <input type="email" class="form-control" 
                                              id="userMail" />
                                          <label for="userMail" class="form-label mt-2" 
                                                 id="mailerrors">
                                              <sup>
                                                  Must be a valid address. Must be less than 156 characters.
                                              </sup>
                                          </label>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-lg-6 mt-1 mb-1">
                                          <label for="userPasswordOne" class="form-label">
                                              Enter Password: 
                                          </label>
                                          <input type="password" class="form-control" id="userPasswordOne" />
                                          <label for="userName" class="form-label mt-2" 
                                                 id="passworderrors">
                                              <sup>
                                                  Must have at least one number and no symbols. Must be between than 6 and 32 characters.
                                              </sup>
                                          </label>
                                      </div>
                                      <div class="col-lg-6 mt-1 mb-1">
                                          <label for="userPasswordTwo" class="form-label">
                                              Confirm Password: 
                                          </label>
                                          <input type="password" class="form-control" id="userPasswordTwo" />
                                          <label for="userName" class="form-label mt-2" 
                                                 id="passwordmatcherrors">
                                              <sup>
                                                  Both Passwords must match
                                              </sup>
                                          </label>
                                      </div>
                                  </div>
                                  <div class="d-grid gap-2 mt-4">
                                      <button class="btn btn-secondary" type="button"
                                      onClick={() => {
                                          let errors = [];
                                          const name = document.getElementById('userName').value;
                                          const email = document.getElementById('userMail').value;
                                          const password = document.getElementById('userPasswordOne').value;
                                          const password2 = document.getElementById('userPasswordTwo').value;

                                          if  (validator.isEmpty(name) || 
                                              !validator.isAlpha(name) || 
                                              !validator.isLength(name, {min:1, max: 155})){
                                                  errors[0] = true;
                                                  document.getElementById('userName').value = ``;
                                                  document.getElementById('userName').placeholder ="Incorrect Formatting";
                                              } else {
                                                  errors[0] = false;
                                          }

                                          if  (validator.isEmpty(email) ||
                                              !validator.isEmail(email) ||
                                              !validator.isLength(email, {min:1, max: 155})){
                                                  errors[1] = true;
                                                  document.getElementById('userMail').value = ``;
                                                  document.getElementById('userMail').placeholder ="Incorrect Formatting";
                                              } else {
                                                  errors[1] = false;
                                          }

                                          if  (validator.isEmpty(password) ||
                                              !validator.isAlphanumeric(password) ||
                                              !validator.isLength(password, {min:6, max: 32})){
                                                  errors[2] = true;
                                                  document.getElementById('userPasswordOne').value = ``;
                                                  document.getElementById('userPasswordOne').placeholder ="Incorrect Formatting";
                                              } else {
                                                  errors[2] = false;
                                          }
                                          if(!validator.equals(password, password2)){
                                              errors[3] = true;
                                              document.getElementById('userPasswordTwo').value = ``;
                                              document.getElementById('userPasswordTwo').placeholder ="Incorrect Formatting";
                                          } else {
                                              errors[3] = false;
                                          }
                                          if(!errors.includes(true)){
                                              const info = {
                                                  name: name,
                                                  email: email,
                                                  password: password,
                                                  password2: password2
                                              }
                                              console.log(info);
                                              axios({
                                                  method: 'post',
                                                  url: 'https://palettescolor-backend.herokuapp.com/users/submituser',
                                                  data: info
                                              }).then(res => {
                                                  console.log(res);
                                                  this.setState({ submitted: true, 
                                                                  submissionStatus: res.data.message});
                                                  setTimeout(function(){ 
                                                    this.handleCloseModal
                                                  }, 1000);
                                              })  
                                          }                                        
                                      }}>
                                      Join Palette
                                      </button>
                                  </div>
                              </div>
                            </div>;
      }; 

      if(this.state.submitted === true){
          submitForm =    <React.Fragment>
                              <div class="container mt-3">
                                  <h5>Hello there,</h5>
                                  <h6>{`This is the status of your registration request: ${this.state.submissionStatus}`}</h6>    
                              </div>
                          </React.Fragment>;
      };

      return (
        <React.Fragment>
            <div class="d-grid gap-2 ">
                <button onClick={this.handleOpenModal} class="btn reglogin" >
                    Register 
                </button>
            </div>
          
          <ReactModal isOpen={this.state.showModal}
                      style={modalStyle} // Referenced at top of file
                      contentLabel="Register User Form" >
            <button onClick={this.handleCloseModal} 
                    class="btn btn-danger position-absolute top-0 end-0" >
            <VscClose /> 
            </button>
            {submitForm}
          </ReactModal>
        </React.Fragment>
      );
    }
  }

  export default Submituser;