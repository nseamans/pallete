import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { UserSchemeContext } from '../context/UserSchemeContext';
import Submituser from '../user_add/submituser';
import axios from 'axios';
import './header.css';

export default function Login(props){
  const {setUser} = useContext(UserContext);
  const {setUserScheme} = useContext(UserSchemeContext);
  return  <React.Fragment>
            <div >
              <div class="d-flex flex-row-reverse bd-highlight">
                <div class="bd-highlight">
                  <Submituser />
                </div>
                <div class="me-1 bd-highlight">
                  <button button 
                      class="btn btnlogin" 
                        onClick={() => {
                          var info = {
                            email: document.getElementById('userEmail').value,
                            password: document.getElementById('userPassword').value };
                          // LOG USER IN //
                          axios({
                            method: 'post',
                            url: 'https://palettescolor-backend.herokuapp.com/users/login',
                            data: info
                          }).then(res => {
                            const token = res.data.token;
                            if(res.data.status === true){
                              // GET USER SCHEMES /
                              axios({
                                method: 'post',
                                url: 'https://palettescolor-backend.herokuapp.com/colors/get_userschemes',
                                data: {email: info.email},
                                headers: {
                                  'Authorization': `Bearer ${token}`
                                }
                              }).then(res => {
                                document.getElementById('userEmail').value = ``;
                                document.getElementById('userPassword').value = ``;
                                setUserScheme({
                                  userSchemes: res.data
                                });
                                setUser({
                                  status: false,
                                  message: "No Action Taken",
                                  username: info.email,
                                  logstatus: `logout`,
                                  token: token
                                })
                              })
                            } else alert(res.data.message);
                          })
                        }} >
                      Login
                  </button>
              </div>
                <div class="me-3 bd-highlight">
                  <input type="password" class="form-control navinput" 
                         id="userPassword" placeholder="Password"/>
                </div>
                <div class="me-2 bd-highlight">
                  <input type="email" class="form-control navinput" 
                         id="userEmail" placeholder="E-mail"/>
                </div>
              </div>
            </div>
          </React.Fragment>
};