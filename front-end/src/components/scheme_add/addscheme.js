import React, { Component } from 'react';
import { UserContext } from '../context/UserContext';
import {testColor, testDescription, testSchemeName, testCategory, 
        testBaseColor, testUI, testPrint, testArt} 
    from '../validation/validationfunctions';
import { UiInfo, Print, Art, Basecolors, Contrast } 
    from './functions/schemeselectoptions';
import axios from 'axios';
import _ from 'lodash';
import './addscheme.css';

/** Schemevalidation
 *  Validates the 
 */
function Schemevalidation() {
    let errors = [false, false, false, false, false, false,
        false, false, false, false, false, false ];

    if (testSchemeName(document.getElementById("schemeNamenew").value) === false ) {
        document.getElementById("schemeNamenew").placeholder =
            `There was no name entered or did not validate.`;
        document.getElementById("schemeNamenew").style.borderColor = "#dc3545";
        errors[0] = true;
    } else document.getElementById("schemeNamenew").style.borderColor = "#868e96";

    if (testDescription(document.getElementById("schemeDescriptionnew").value) === false) {
        document.getElementById("schemeDescriptionnew").placeholder =
            `There was no description entered or did not validate.`;
        document.getElementById("schemeDescriptionnew").style.borderColor = "#dc3545";
        errors[1] = true;
    } else document.getElementById("schemeDescriptionnew").style.borderColor = "#868e96";

    if (testBaseColor(document.getElementById("basecolornew").value) === false) {
        errors[2] = true;
    }

    if (testCategory(document.getElementById("categorynew").value) === true) {
        if (document.getElementById("categorynew").value === 'UI') {
            if (testUI(document.getElementById("subcategorynew").value) === false) {
                errors[4] = true;
            }
        } else if (document.getElementById("categorynew").value === 'PRINT') {
            if (testPrint(document.getElementById("subcategorynew").value) === false) {
                errors[4] = true;
            }
        } else if (document.getElementById("categorynew").value === 'ART') {
            if (testArt(document.getElementById("subcategorynew").value) === false) {
                errors[4] = true;
            }
        }
    } else errors[3] = true;

    if (testColor(`#${document.getElementById("color1new").value}`, false) === false) {
        document.getElementById("color1new").style.borderColor = "#dc3545";
        errors[5] = true;
    } else document.getElementById("color1new").style.borderColor = "#868e96";

    if (testColor(`#${document.getElementById("color2new").value}`, false) === false) {
        document.getElementById("color2new").style.borderColor = "#dc3545";
        errors[6] = true;
    } else document.getElementById("color2new").style.borderColor = "#868e96";

    if (testColor(`#${document.getElementById("color3new").value}`, false) === false) {
        document.getElementById("color3new").style.borderColor = "#dc3545";
        errors[7] = true;
    } else document.getElementById("color3new").style.borderColor = "#868e96";

    if (testColor(`#${document.getElementById("color4new").value}`, false) === false) {
        document.getElementById("color4new").style.borderColor = "#dc3545";
        errors[8] = true;
    } else document.getElementById("color4new").style.borderColor = "#868e96";

    if (testColor(`#${document.getElementById("color5new").value}`, false) === false) {
        document.getElementById("color5new").style.borderColor = "#dc3545";
        errors[9] = true;
    } else document.getElementById("color5new").style.borderColor = "#868e96";

    if (testColor(`#${document.getElementById("color6new").value}`, false) === false) {
        document.getElementById("color6new").style.borderColor = "#dc3545";
        errors[10] = true;
    } else document.getElementById("color6new").style.borderColor = "#868e96";

    if (testColor(`#${document.getElementById("color7new").value}`, false) === false) {
        document.getElementById("color7new").style.borderColor = "#dc3545";
        errors[11] = true;
    } else document.getElementById("color7new").style.borderColor = "#868e96";

    return errors;
}

function Colordisplay(props){
    let colorhex;
        if( props.colorhex.length < 3 || props.colorhex.length > 6){
            colorhex = {
                backgroundColor: ``,
                height: `1em`
            }
        } else {
            colorhex = {
                backgroundColor: `#${props.colorhex}`,
                height: `1em`
            }
    };
    return  <React.Fragment>
                <div style={colorhex} />
            </React.Fragment>;
}

class Addschemeform extends Component {
    static contextType = UserContext;
    constructor() {
        super();
        this.state = {
            categorystate: "UI",
            colorhex1addnew: ``,
            colorhex2addnew: ``,
            colorhex3addnew: ``,
            colorhex4addnew: ``,
            colorhex5addnew: ``,
            colorhex6addnew: ``,
            colorhex7addnew: ``
        };
        this.submitScheme = this.submitScheme.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeColor1 = this.changeColor1.bind(this);
        this.changeColor2 = this.changeColor2.bind(this);
        this.changeColor3 = this.changeColor3.bind(this);
        this.changeColor4 = this.changeColor4.bind(this);
        this.changeColor5 = this.changeColor5.bind(this);
        this.changeColor6 = this.changeColor6.bind(this);
        this.changeColor7 = this.changeColor7.bind(this);
    }

    submitScheme(event){
        const token = event.target.value;
        let errors = Schemevalidation();
        const info = {
            CategoryID: 1,
            Category: document.getElementById("categorynew").value,
            SubCategory: document.getElementById("subcategorynew").value,
            SchemeName: document.getElementById("schemeNamenew").value,
            SchemeDescription: document.getElementById("schemeDescriptionnew").value,
            Contrast: document.getElementById("contrastnew").value,
            BaseColor: document.getElementById("basecolornew").value,
            Color1ID: `#${document.getElementById("color1new").value}`,
            Color2ID: `#${document.getElementById("color2new").value}`,
            Color3ID: `#${document.getElementById("color3new").value}`,
            Color4ID: `#${document.getElementById("color4new").value}`,
            Color5ID: `#${document.getElementById("color5new").value}`,
            Color6ID: `#${document.getElementById("color6new").value}`,
            Color7ID: `#${document.getElementById("color7new").value}`
        };    
        if(errors.includes(true) === false){
            // CREATE A NEW SCHEME //
            axios({
                method: 'post',
                url: 'https://palettescolor-backend.herokuapp.com/colors/create_scheme',
                data: info,
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            }).then(function (response) {
                if(response.data.status === true){
                    alert(response.data.message);
                    document.getElementById("categorynew").value = `UI`;
                    document.getElementById("subcategorynew").value = `DARK`;
                    document.getElementById("schemeDescriptionnew").value = ``;
                    document.getElementById("contrastnew").value = `HIGHCONTRAST`;
                    document.getElementById("color1new").value = ``;
                    document.getElementById("color2new").value = ``;
                    document.getElementById("color3new").value = ``;
                    document.getElementById("color4new").value = ``;
                    document.getElementById("color5new").value = ``;
                    document.getElementById("color6new").value = ``;
                    document.getElementById("color7new").value = ``;

                    this.setState({
                        colorhex1addnew: ``,
                        colorhex2addnew: ``,
                        colorhex3addnew: ``,
                        colorhex4addnew: ``,
                        colorhex5addnew: ``,
                        colorhex6addnew: ``,
                        colorhex7addnew: `` });

                } else {
                    alert(response.data.message);
                }                
            });
            
        } else alert("Errors detected in form submission"); 
    }

    changeCategory(){
        this.setState({
            categorystate: document.getElementById("categorynew").value
        });
    }

    changeColor1(event){
        this.setState({colorhex1addnew: event.target.value});
    }
    changeColor2(event){
        this.setState({colorhex2addnew: event.target.value});
    }
    changeColor3(event){
        this.setState({colorhex3addnew: event.target.value});
    }
    changeColor4(event){
        this.setState({colorhex4addnew: event.target.value});
    }
    changeColor5(event){
        this.setState({colorhex5addnew: event.target.value});
    }
    changeColor6(event){
        this.setState({colorhex6addnew: event.target.value});
    }
    changeColor7(event){
        this.setState({colorhex7addnew: event.target.value});
    }

    render() {        
        const {user} = this.context;
        let subCategory;
        if(this.state.categorystate === "UI"){
            subCategory = UiInfo();
        } else if(this.state.categorystate === "PRINT"){
            subCategory = Print();
        } else if (this.state.categorystate === "ART"){
            subCategory = Art();
        }

        return (
            <React.Fragment>
                <h4>Scheme Information</h4>
                <div class="form-group mt-2 mb-2">
                    <label for="exampleFormControlSelect1">Scheme Name</label>
                    <input type="text" class="form-control" id="schemeNamenew"
                           placeholder="Enter the name of the scheme" />
                </div>

                <div class="mt-2 mb-3">
                    <label for="schemeDescription" class="form-label">
                        Scheme Description
                    </label>
                    <textarea class="form-control" id="schemeDescriptionnew" rows="4" 
                              placeholder="Enter a description of the purpose of the color scheme." />
                </div>

                <div class="row">
                    <div class=" col-md-6">
                        <div class="form-group mt-2 mb-2">
                            <label for="exampleFormControlSelect1">Category</label>
                            <select class="selectstyle form-select form-select-sm me-2" id="categorynew" 
                                    onChange={this.changeCategory}>
                                <option selected="selected" value="UI">
                                    UserUI
                                </option>
                                <option value="PRINT">
                                    Print
                                </option>
                                <option value="ART">
                                    Art
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class=" col-md-6">
                        <div class="form-group mt-2 mb-2">
                            <label for="exampleFormControlSelect1">Sub Category</label>
                            <select class="selectstyle form-select form-select-sm me-2" id="subcategorynew">
                                {subCategory}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class=" col-md-6">
                        <div class="form-group mt-2 mb-2">
                            <label for="exampleFormControlSelect1">Base Color</label>
                            <select class="selectstyle form-select form-select-sm me-2" id="basecolornew">
                                {Basecolors()}
                            </select>
                        </div>
                    </div>
                    <div class=" col-md-6">
                        <div class="form-group mt-2 mb-2">
                            <label for="exampleFormControlSelect1">Contrast</label>
                            <select class="selectstyle form-select form-select-sm me-2" id="contrastnew">
                                {Contrast()}
                            </select>
                        </div>
                    </div>
                </div>

                <h4 class="mt-3 mb-3">Enter Scheme Hex Colors</h4>
                
                <div class="row mt-4">
                    <div class=" col">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control"  
                                   id="color1new" onChange={this.changeColor1} />
                        </div>
                        <Colordisplay colorhex ={this.state.colorhex1addnew}/>
                    </div>
                    <div class=" col">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control"  
                                   id="color2new" onChange={this.changeColor2} />
                        </div>
                        <Colordisplay colorhex ={this.state.colorhex2addnew}/>
                    </div>
                    <div class=" col">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control"  
                                   id="color3new" onChange={this.changeColor3} />
                        </div>
                        <Colordisplay colorhex ={this.state.colorhex3addnew}/>
                    </div>
                    <div class=" col">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control"  
                                   id="color4new" onChange={this.changeColor4} />
                        </div>
                        <Colordisplay colorhex ={this.state.colorhex4addnew}/>
                    </div>
                    <div class=" col">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control"  
                                   id="color5new" onChange={this.changeColor5} />
                        </div>
                        <Colordisplay colorhex ={this.state.colorhex5addnew}/>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control"  
                                   id="color6new" onChange={this.changeColor6} />
                        </div>
                        <Colordisplay colorhex ={this.state.colorhex6addnew}/>
                    </div>
                    <div class=" col">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" 
                                   id="color7new" onChange={this.changeColor7} />
                        </div>
                        <Colordisplay colorhex ={this.state.colorhex7addnew}/>
                    </div>
                </div>

                <div class="d-grid gap-2 mt-4 mb-2">
                    <button class="btn btn-secondary" type="button" 
                            onClick={this.submitScheme} value={user.token}>
                        Submit Color Scheme
                    </button>
                </div>
            </React.Fragment>
        );
    };
};


/** Loginmessage
 *  Load if there is no user logged in.
 */
function Loginmessage(){
    return <div class="container">
        <h5>Please log-in to submit a scheme.</h5>
    </div>
}

class Addscheme extends Component {
    constructor() {
        super();
    }
    render() { 
        let schemeadddisplay;
        if(this.context.user.logstatus === 'login'){
            schemeadddisplay = <Loginmessage />;
        }    
        if(this.context.user.logstatus === 'logout'){
            schemeadddisplay = <Addschemeform />;
        } 
        return (
            <React.Fragment>
                {schemeadddisplay}
            </React.Fragment>
        );
    };
};
Addscheme.contextType = UserContext;
export default Addscheme;