import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import _ from 'lodash';
import '../search.css';

/** Colorcard()
 *  The card to display information pertaining to the 
 *  color scheme selected
 */
export default function Colorcard(props){
    let scheme = props.scheme;
    return  <div class="card mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title mb-3">{`Title: ${scheme.SchemeName}`}</h5>
                    <hr />
                    <div class="row">
                        <p>{scheme.SchemeDescription}</p>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 mt-1 mb-1">
                            <h6 class="card-subtitle mb-2">
                                Category
                            </h6>
                            <h6 class="card-subtitle mb-2 text-muted">
                                {_.capitalize(scheme.Category)}
                            </h6>
                        </div>
                        <div class="col-sm-3 mt-1 mb-1">
                            <h6 class="card-subtitle mb-2">
                                Sub Category
                            </h6>
                            <h6 class="card-subtitle mb-2 text-muted">
                                {_.capitalize(scheme.SubCategory)}
                            </h6>
                        </div>
                        <div class="col-sm-3 mt-1 mb-1">
                            <h6 class="card-subtitle mb-2">
                                Primary Color
                            </h6>
                            <h6 class="card-subtitle mb-2 text-muted">
                                {_.capitalize(scheme.MainColor)}
                            </h6>
                        </div>
                        <div class="col-sm-3 mt-1 mb-1">
                            <h6 class="card-subtitle mb-2">
                                Contrast
                            </h6>
                            <h6 class="card-subtitle mb-2 text-muted">
                                {_.capitalize(scheme.Contrast)}
                            </h6>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <Colorbox color = {scheme.Color1ID.toUpperCase()} />
                        </div>
                        <div class="col">
                            <Colorbox color = {scheme.Color2ID.toUpperCase()} />
                        </div>
                        <div class="col">
                            <Colorbox color = {scheme.Color3ID.toUpperCase()} />
                        </div>
                        <div class="col">
                            <Colorbox color = {scheme.Color4ID.toUpperCase()} />
                        </div>
                        <div class="col">
                            <Colorbox color = {scheme.Color5ID.toUpperCase()} />
                        </div>
                        <div class="col">
                            <Colorbox color = {scheme.Color6ID.toUpperCase()} />
                        </div>
                        <div class="col">
                            <Colorbox color = {scheme.Color7ID.toUpperCase()} />
                        </div>
                    </div>

                </div>
            </div>; 
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
}