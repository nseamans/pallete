import React, { useContext, Component } from 'react';
import ReactModal from 'react-modal';
import { VscClose } from "react-icons/vsc";
import axios from 'axios';
import _ from 'lodash';

import {testColor, testDescription, testBaseColor} 
    from '../../validation/validationfunctions';
import {Basecolors, Contrast } 
    from './schemeselectoptions';

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
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  // ReactModal.setAppElement('#yourAppElement');

/** schemeValColorChange
 *  Changes the color of the border of a form input if the 
 *  data does not validate to red.
 */
function schemeValColorChange() {
    const red = "#dc3545";
    const grey = "#868e96";
    if (testDescription(document.getElementById("schemeDescription").value) === false) {
        document.getElementById("schemeDescription").placeholder =
            `There was no description entered or did not validate.`;
        document.getElementById("schemeDescription").style.borderColor = red;
    } else document.getElementById("schemeDescription").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color1").value}`, false) === false) {
        document.getElementById("color1").style.borderColor = red;
    } else document.getElementById("color1").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color2").value}`, false) === false) {
        document.getElementById("color2").style.borderColor = red;
    } else document.getElementById("color2").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color3").value}`, false) === false) {
        document.getElementById("color3").style.borderColor = red;
    } else document.getElementById("color3").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color4").value}`, false) === false) {
        document.getElementById("color4").style.borderColor = red;
    } else document.getElementById("color4").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color5").value}`, false) === false) {
        document.getElementById("color5").style.borderColor = red;
    } else document.getElementById("color5").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color6").value}`, false) === false) {
        document.getElementById("color6").style.borderColor = red;
    } else document.getElementById("color6").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color7").value}`, false) === false) {
        document.getElementById("color7").style.borderColor = red;
    } else document.getElementById("color7").style.borderColor = grey;
}

/** finSchemeVal
 * The final front end validation before sending the information to 
 * the node.js back-end.
 * @param {*} errorobj The information gathered from the edit form
 * @returns an array of the error checks
 */
function finSchemeVal(errorobj) {
    const errorArray = Object.values(_.omit(errorobj, ['SchemeName','Contrast']));
    if(errorArray.length === 9){
        let errors = [false, false, false, false, false, false, false, false, false ];
        if (testDescription(errorArray[0]) === false)  errors[0] = true;
        if (testBaseColor(errorArray[1]) === false)    errors[1] = true;
        if (testColor(errorArray[2], false) === false) errors[2] = true;
        if (testColor(errorArray[3], false) === false) errors[3] = true;
        if (testColor(errorArray[4], false) === false) errors[4] = true;
        if (testColor(errorArray[5], false) === false) errors[5] = true;
        if (testColor(errorArray[6], false) === false) errors[6] = true;
        if (testColor(errorArray[7], false) === false) errors[7] = true;
        if (testColor(errorArray[8], false) === false) errors[8] = true;
        console.log(errors);
        return errors;    
    } else return [true];
};

/** ogColor
 *  Displays the Schemes original color
 * @param {*} color the color to display
 * @returns  style info for color display
 */
function ogColor(color){
    return {
        backgroundColor: color,
        height: `1em`
    };
}

/** Colordisplay
 *  Handles the function of displaying the original color  in comparison
 *  to the new one being presented. 
 */
function Colordisplay(props){
    const colorhexoriginal = {
        backgroundColor: props.color.backgroundColor,
        height: props.color.height
    };
    let colorhexnew = {
        backgroundColor: `#${props.newcolor}`,
        height: `1em`
    };
    if( props.newcolor.length < 3 || props.newcolor.length > 6){
        colorhexnew = {
            backgroundColor: ``,
            height: `1em`
        }
    } else {
        colorhexnew = {
            backgroundColor: `#${props.newcolor}`,
            height: `1em`
        }
    };

    return  <React.Fragment>
                <p>Original Color</p>
                    <div style={colorhexoriginal} />
                    <p style={{marginTop: '.50em'}}>New Color</p>
                <div style={colorhexnew} />
            </React.Fragment>;
};

/** schemeValColorChange
 * Changes the color of an input border to red if validated to be wrong.
 */
function schemeValColorChange() {
    const red = "#dc3545";
    const grey = "#868e96";
    if (testDescription(document.getElementById("schemeDescription").value) === false) {
        document.getElementById("schemeDescription").placeholder =
            `There was no description entered or did not validate.`;
        document.getElementById("schemeDescription").style.borderColor = red;
    } else document.getElementById("schemeDescription").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color1").value}`, false) === false) {
        document.getElementById("color1").style.borderColor = red;
    } else document.getElementById("color1").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color2").value}`, false) === false) {
        document.getElementById("color2").style.borderColor = red;
    } else document.getElementById("color2").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color3").value}`, false) === false) {
        document.getElementById("color3").style.borderColor = red;
    } else document.getElementById("color3").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color4").value}`, false) === false) {
        document.getElementById("color4").style.borderColor = red;
    } else document.getElementById("color4").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color5").value}`, false) === false) {
        document.getElementById("color5").style.borderColor = red;
    } else document.getElementById("color5").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color6").value}`, false) === false) {
        document.getElementById("color6").style.borderColor = red;
    } else document.getElementById("color6").style.borderColor = grey;

    if (testColor(`#${document.getElementById("color7").value}`, false) === false) {
        document.getElementById("color7").style.borderColor = red;
    } else document.getElementById("color7").style.borderColor = grey;
}

/** Submitinfo
 *  validates and submits the changes to the scheme to the back-end. 
 */
function Submitinfo(props) {
    const {setUserScheme} = useContext(UserSchemeContext);
    const {user} = useContext(UserContext);
    function handleSubmit() {
        const info = {
            SchemeName: props.scheme.SchemeName,
            SchemeDescription: props.scheme.SchemeDescription,
            Contrast: props.scheme.Contrast,
            BaseColor: props.scheme.BaseColor,
            Color1ID: `#${props.scheme.colorhex1}`,
            Color2ID: `#${props.scheme.colorhex2}`,
            Color3ID: `#${props.scheme.colorhex3}`,
            Color4ID: `#${props.scheme.colorhex4}`,
            Color5ID: `#${props.scheme.colorhex5}`,
            Color6ID: `#${props.scheme.colorhex6}`,
            Color7ID: `#${props.scheme.colorhex7}`
        }
        console.log(props);
        const errors = finSchemeVal(info);
        if(!errors.includes(true)){
            // UPDATE A SCHEME //
            axios({
                method: 'post',
                url: 'https://palettescolor-backend.herokuapp.com/colors/update_scheme',
                data: info,
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
                        setUserScheme({
                          userSchemes: res.data
                        });
                    })
                } else {
                    alert(res.data.message);
                }
                props.close();
            });
        } else {
            props.onSubmit();
            alert("Submission contained validation errors.");
        } 
    }
    return  <button class="btn btn-secondary" type="button"
                    onClick={handleSubmit}>
                Submit Changes
            </button>;            
};

class Addschemeform extends Component {
    constructor() {
        super();
        this.state = {
            colorpick: '#fff',
            categorystate: "UI",
            SchemeDescription: ``,
            Contrast: ``,
            BaseColor: ``,
            colorhex1: ``,
            colorhex2: ``,
            colorhex3: ``,
            colorhex4: ``,
            colorhex5: ``,
            colorhex6: ``,
            colorhex7: ``
        };

        this.changeDescription = this.changeDescription.bind(this);
        this.changeContrast = this.changeContrast.bind(this);
        this.changeBaseColor = this.changeBaseColor.bind(this);
        this.changeColor1 = this.changeColor1.bind(this);
        this.changeColor2 = this.changeColor2.bind(this);
        this.changeColor3 = this.changeColor3.bind(this);
        this.changeColor4 = this.changeColor4.bind(this);
        this.changeColor5 = this.changeColor5.bind(this);
        this.changeColor6 = this.changeColor6.bind(this);
        this.changeColor7 = this.changeColor7.bind(this);
    }

    /** componentDidMount
     * Establishes the information present in a scheme
     */
    componentDidMount(){
        document.getElementById('schemeName').value = this.props.scheme.SchemeName;
        document.getElementById('schemeDescription').value = this.props.scheme.SchemeDescription;
        document.getElementById('basecolor').value = this.props.scheme.MainColor;
        document.getElementById('contrast').value = this.props.scheme.Contrast;
        console.log(this.props.scheme);
    
        document.getElementById('color1').value = 
            this.props.scheme.Color1ID.slice(1, this.props.scheme.Color1ID.length);
        document.getElementById('color2').value = 
            this.props.scheme.Color2ID.slice(1, this.props.scheme.Color2ID.length);
        document.getElementById('color3').value = 
            this.props.scheme.Color3ID.slice(1, this.props.scheme.Color3ID.length);
        document.getElementById('color4').value = 
            this.props.scheme.Color4ID.slice(1, this.props.scheme.Color4ID.length);
        document.getElementById('color5').value = 
            this.props.scheme.Color5ID.slice(1, this.props.scheme.Color5ID.length);
        document.getElementById('color6').value = 
            this.props.scheme.Color6ID.slice(1, this.props.scheme.Color6ID.length);
        document.getElementById('color7').value = 
            this.props.scheme.Color7ID.slice(1, this.props.scheme.Color7ID.length);

        this.setState({
            categorystate: "UI",
            SchemeName: this.props.scheme.SchemeName,
            SchemeDescription: this.props.scheme.SchemeDescription,
            Contrast: this.props.scheme.Contrast,
            BaseColor: this.props.scheme.MainColor,
            colorhex1: this.props.scheme.Color1ID.slice(1, this.props.scheme.Color1ID.length),
            colorhex2: this.props.scheme.Color2ID.slice(1, this.props.scheme.Color2ID.length),
            colorhex3: this.props.scheme.Color3ID.slice(1, this.props.scheme.Color3ID.length),
            colorhex4: this.props.scheme.Color4ID.slice(1, this.props.scheme.Color4ID.length),
            colorhex5: this.props.scheme.Color5ID.slice(1, this.props.scheme.Color5ID.length),
            colorhex6: this.props.scheme.Color6ID.slice(1, this.props.scheme.Color6ID.length),
            colorhex7: this.props.scheme.Color7ID.slice(1, this.props.scheme.Color7ID.length)
        });
    }

    submitScheme(){
        schemeValColorChange(); 
    }

    changeDescription(event){
        this.setState({
            SchemeDescription: event.target.value
        });
    }

    changeContrast(event){
        this.setState({
            Contrast: event.target.value
        });
    }

    changeBaseColor(event){
        this.setState({
            BaseColor: event.target.value
        });
    }

    changeCategory(event){
        this.setState({
            categorystate: event.target.value
        });
    }

    changeColor1(event){
        this.setState({colorhex1: event.target.value});
    }
    
    changeColor2(event){
        this.setState({colorhex2: event.target.value});
    }

    changeColor3(event){
        this.setState({colorhex3: event.target.value});
    }
    
    changeColor4(event){
        this.setState({colorhex4: event.target.value});
    }

    changeColor5(event){
        this.setState({colorhex5: event.target.value});
    }

    changeColor6(event){
        this.setState({colorhex6: event.target.value});
    }

    changeColor7(event){
        this.setState({colorhex7: event.target.value});
    }

    render() {     
        return (
            <div class="mt-3 mb-3 ps-5 pe-5">
                <div class="container category">
                    <h4 class="mt-2">Scheme Information</h4>
                    <div class="form-group mt-2 mb-2">
                        <input type="text" class="form-control-plaintext" id="schemeName" readonly />
                    </div>
                    <div class="form-group mt-2 mb-3">
                        <label for="schemeDescription" class="form-label">
                            Scheme Description
                        </label>
                        <textarea class="form-control" id="schemeDescription" rows="4" 
                                onChange={this.changeDescription}/>
                    </div>
                    <div class="row">
                        <div class=" col-md-6">
                            <div class="form-group mt-2 mb-2">
                                <label for="basecolor">Base Color</label>
                                <select class="selectstyle form-select form-select-sm me-2" 
                                        id="basecolor" onChange={this.changeBaseColor} >
                                    {Basecolors()}
                                </select>
                            </div>
                        </div>
                        <div class=" col-md-6">
                            <div class="form-group mt-2 mb-2">
                                <label for="contrast">Contrast</label>
                                <select class="selectstyle form-select form-select-sm me-2" 
                                        id="contrast" onChange={this.changeContrast} >
                                    {Contrast()}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class=" col">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control"  
                                    id="color1" onChange={this.changeColor1} />
                            </div>
                            <Colordisplay color={ogColor(this.props.scheme.Color1ID)} 
                                          newcolor={this.state.colorhex1} />
                        </div>
                        <div class=" col">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control"  
                                    id="color2" onChange={this.changeColor2}  />
                            </div>
                            <Colordisplay color={ogColor(this.props.scheme.Color2ID)} 
                                          newcolor={this.state.colorhex2} />
                        </div>
                        <div class=" col">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control"  
                                    id="color3" onChange={this.changeColor3}  />
                            </div>
                            <Colordisplay color={ogColor(this.props.scheme.Color3ID)} 
                                          newcolor={this.state.colorhex3} />
                        </div>
                        <div class=" col">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control"  
                                    id="color4" onChange={this.changeColor4}  />
                            </div>
                            <Colordisplay color={ogColor(this.props.scheme.Color4ID)} 
                                          newcolor={this.state.colorhex4} />
                        </div>
                        <div class=" col">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control"  
                                    id="color5" onChange={this.changeColor5}  />
                            </div>
                            <Colordisplay color={ogColor(this.props.scheme.Color5ID)} 
                                          newcolor={this.state.colorhex5} />
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control"  
                                    id="color6" onChange={this.changeColor6}  />
                            </div>
                            <Colordisplay color={ogColor(this.props.scheme.Color6ID)} 
                                          newcolor={this.state.colorhex6} />
                        </div>
                        <div class=" col">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" 
                                    id="color7" onChange={this.changeColor7} />
                            </div>
                            <Colordisplay color={ogColor(this.props.scheme.Color7ID)} 
                                          newcolor={this.state.colorhex7} />
                        </div>
                    </div>

                    <div class="d-grid gap-2 mt-4 mb-2">
                        <div class="row">
                            <div class="col">
                                <div class="d-grid gap-2">
                                    <Submitinfo scheme= {this.state} 
                                                close = {this.props.close}
                                                onSubmit = {this.submitScheme} />
                                </div>
                            </div>
                            <div class="col">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-danger" type="button" 
                                            onClick={this.props.close}>
                                        Cancel Submission
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

/** Editscheme
 *  Presents the scheme edit menu with a modal.
 */
export default function Editscheme(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }
  
    return (
      <div>
        <button onClick={openModal} class="btn btn-secondary me-md-2" 
                style={{minWidth: '6em'}} type="button">
                Edit
        </button>
        <ReactModal
          style={modalStyle}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Scheme Modal" >

          <button onClick={closeModal} 
                    class="btn btn-danger position-absolute top-0 end-0" >
            <VscClose /> 
          </button>

          <Addschemeform scheme = {props.scheme} 
                         close = {closeModal} />

        </ReactModal>
      </div>
    );
};