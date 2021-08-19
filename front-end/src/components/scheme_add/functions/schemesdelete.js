import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { VscClose } from "react-icons/vsc";
import axios from 'axios';
import _ from 'lodash';

import { UserSchemeContext } from "../../context/UserSchemeContext";
import { UserContext } from "../../context/UserContext"

const modalStyle = {
    content: {  
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '0px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
};

/** Deleteschemeform
 *  The form to delete a scheme. 
 */
function Deleteschemeform(props){
    const {setUserScheme} = useContext(UserSchemeContext);
    const {user} = useContext(UserContext);
    function deletescheme(){
        // DELETE A SCHEME //
        axios({
            method: 'post',
            url: 'https://palettescolor-backend.herokuapp.com/colors/delete_scheme',
            data: {_id: props.scheme._id},
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          }).then(res => {
            if(res.data.status === true){
              // UPDATE SCHEME LIST //
              axios({
                method: 'post',
                url: 'https://palettescolor-backend.herokuapp.com/colors/get_userschemes',
                data: {email: user.username},
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              }).then(res => {
                console.log(JSON.stringify(res.data));
                setUserScheme({
                  userSchemes: res.data
                });
                props.close();
              })
            }  else alert("Was not able to delete data");          
        })
    };

    return  <div class="mt-3 mb-3 ps-5 pe-5">
                <div class="container">
                  <h5 class="mt-4 mb-3">Do you want to delete this scheme?</h5>
                  <div class="d-grid gap-2">
                      <button class="btn btn-danger" type="button" onClick={deletescheme}> 
                        Delete Scheme
                      </button>
                  </div>
                </div>
            </div>;
};

/** Deletescheme
 * Presents the delete edit menu with a modal.
 */
export default function Deletescheme(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }
  
    return (
      <div>
        <button onClick={openModal} class="btn btn-danger me-md-2" 
                style={{minWidth: '6em'}} type="button">
                Delete
        </button>
        <ReactModal
          style={modalStyle}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
        <button onClick={closeModal} 
                    class="btn btn-danger position-absolute top-0 end-0" >
            <VscClose /> 
        </button>
        <Deleteschemeform scheme = {props.scheme}
                          close = {closeModal}/>
        </ReactModal>
      </div>
    );
  };