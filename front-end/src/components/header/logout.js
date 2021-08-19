import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { UserSchemeContext } from '../context/UserSchemeContext';
import axios from 'axios';
import './header.css';

export default function Logout(){
    const {user, setUser} = useContext(UserContext);
    const {setUserScheme} = useContext(UserSchemeContext);
    return  <React.Fragment>
              <div >
                <div class="d-flex flex-row-reverse bd-highlight">
                  <div class="d-highlight">
                    <button button 
                        class="btn btnlogin" 
                          onClick={() => {
                            axios.get(`https://palettescolor-backend.herokuapp.com/users/logout`)
                            .then(res => {
                              setUser(res.data);
                              setUserScheme([]);
                            })
                          }} >
                        Log-out
                    </button>
                </div>
                  <div class="pe-2 bd-highlight">
                    <p>{`Hello ` + user.username}</p>  
                  </div>
                </div>
              </div>
            </React.Fragment>
  };