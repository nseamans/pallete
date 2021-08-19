import React, { Component, useContext, useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import _ from 'lodash';
import Deletescheme from './functions/schemesdelete';
import Editscheme from './functions/schemesedit';
import axios from 'axios';
import { UserSchemeContext } from "../context/UserSchemeContext";
import { UserContext } from "../context/UserContext"
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// ReactModal.setAppElement('#yourAppElement');

class Schemecard extends Component {
    constructor() {
        super();
    }
    render() { 
        return  <React.Fragment>
                    <div class="card mt-2 mb-3">
                            <h5 class="card-header">
                                <div class="row">
                                    <div class="col">
                                        <h5>Scheme Name: {this.props.scheme.SchemeName}</h5>
                                    </div>
                                    <div class="col">
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <Editscheme scheme = {this.props.scheme}/>
                                            <Deletescheme scheme = {this.props.scheme}/>
                                        </div>
                                    </div>
                                </div>
                            </h5>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3 mt-1 mb-1">
                                        <h6 class="card-subtitle mb-2">
                                            Category
                                        </h6>
                                        <h6 class="card-subtitle mb-2 text-muted">
                                            {_.capitalize(this.props.scheme.Category)}
                                        </h6>
                                    </div>
                                    <div class="col-sm-3 mt-1 mb-1">
                                        <h6 class="card-subtitle mb-2">
                                            Sub Category
                                        </h6>
                                        <h6 class="card-subtitle mb-2 text-muted">
                                            {_.capitalize(this.props.scheme.SubCategory)}
                                        </h6>
                                    </div>
                                    <div class="col-sm-3 mt-1 mb-1">
                                        <h6 class="card-subtitle mb-2">
                                            Primary Color
                                        </h6>
                                        <h6 class="card-subtitle mb-2 text-muted">
                                            {_.capitalize(this.props.scheme.MainColor)}
                                        </h6>
                                    </div>
                                    <div class="col-sm-3 mt-1 mb-1">
                                        <h6 class="card-subtitle mb-2">
                                            Contrast
                                        </h6>
                                        <h6 class="card-subtitle mb-2 text-muted">
                                            {_.capitalize(this.props.scheme.Contrast)}
                                        </h6>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <p class="card-text mt-2 mb-3">
                                            {this.props.scheme.SchemeDescription}
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <Colorbox color = {this.props.scheme.Color1ID.toUpperCase()} />
                                    </div>
                                    <div class="col">
                                        <Colorbox color = {this.props.scheme.Color2ID.toUpperCase()} />
                                    </div>
                                    <div class="col">
                                        <Colorbox color = {this.props.scheme.Color3ID.toUpperCase()} />
                                    </div>
                                    <div class="col">
                                        <Colorbox color = {this.props.scheme.Color4ID.toUpperCase()} />
                                    </div>
                                    <div class="col">
                                        <Colorbox color = {this.props.scheme.Color5ID.toUpperCase()} />
                                    </div>
                                    <div class="col">
                                        <Colorbox color = {this.props.scheme.Color6ID.toUpperCase()} />
                                    </div>
                                    <div class="col">
                                        <Colorbox color = {this.props.scheme.Color7ID.toUpperCase()} />
                                    </div>
                                </div>
                            </div>
                        </div>
            </React.Fragment>;
    }
};

/** Colorbox()
 *  Displays the color and allows a user to save it in their clipboard
 */
 function Colorbox(props){
    const colorBar = {
        backgroundColor: props.color,
        height: "2em",
        padding: ".25em"
    }

    const copyInfo = {
        cursor: "pointer",
        paddingTop: ".5em"
    }

    return  <div class="mt-1 mb-1">
                <div style= {colorBar} /> 
                <div class="copyDiv mt-1">
                    <CopyToClipboard text={props.color}>
                        <span style={copyInfo}>
                            <h6 class="boxtext">{props.color}</h6>
                        </span>
                    </CopyToClipboard>
                </div>    
            </div> 
};

/** Userschemelist
 *  Provides a list of schemes that a user has created.
 */
export default function Userschemelist(){
    const {userScheme, setUserScheme} = useContext(UserSchemeContext);
    const {user} = useContext(UserContext);
    useEffect(() => {     
        if( user.username  !== null  || 
            user.username  !== ``    || 
            user.username  !== undefined ){
            const useremail = user.username;
            const token = user.token;
            axios({
                // GET USER COLOR SCHEME //
                method: 'post',
                url: 'https://palettescolor-backend.herokuapp.com/colors/get_userschemes',
                data: {email: useremail},
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setUserScheme({
                  userSchemes: res.data
                });
            })
        }
    }, []);
    
    let editlist;
    if(userScheme.userSchemes.length > 0){
        editlist =  <React.Fragment>
                        {Object.values(userScheme.userSchemes).map((scheme) => (
                            <React.Fragment>
                                <Schemecard scheme= {scheme}/>
                            </React.Fragment>
                        ))}
                    </React.Fragment>;
    } else {
        editlist =  <React.Fragment>
                        <h4>You have not created any schemes to edit yet.</h4>
                    </React.Fragment>;
    };

    let schemecount;
    if(userScheme.userSchemes.length !== undefined){
        schemecount = `Amount of schemes you have created: ${userScheme.userSchemes.length}`;
    } else schemecount = ``;

    return  <React.Fragment>
                <div class="searchwindow pe-2">
                    {editlist}    
                </div>
                <div class="d-flex justify-content-end mt-4">
                    {schemecount}    
                </div> 
                <div class="mt-4"></div>
            </React.Fragment>;
};