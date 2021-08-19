import React from 'react';
import _ from 'lodash';
import '../search.css';

/** UiInfo
 *  UiInfo subcategory options
 */
 export function UiInfo(){
    return <React.Fragment>
        <option selected="selected" value="DARK">
            Dark
        </option>
        <option value="LIGHT">
            Light
        </option>
        <option value="OTHER">
            Other
        </option>
    </React.Fragment>
}

/** Print
 *  Print subcategory options
 */
export function Print(){
    return <React.Fragment>
        <option selected="selected" value="MAGAZINE">
            Magazine
        </option>
        <option value="BROCHURE">
            Brochure
        </option>
        <option value="ADVERTISEMENT">
            Advertisement
        </option>
        <option value="OTHER">
            Other
        </option>
    </React.Fragment>
}

/** Art
 * Art subcategory options
 */
export function Art(){
    return <React.Fragment>        
        <option selected="selected" value="GRADIENT">
            Gradient
        </option>
        <option value="ENVIROMENT">
            Enviroment
        </option>
        <option value="OBJECT">
            Object
        </option>
        <option value="SKINTONE">
            Skin Tone
        </option>
        <option value="OTHER">
            Other
        </option>
    </React.Fragment>
}

/** SearchOptions()
 *  Codes to display the database query options to users.
 */
export function SearchOptions(props){
    return <React.Fragment>
                <div class="row">
                    <div class="col-sm">
                        <div class="form-group  mt-2">
                            <label for="exampleFormControlSelect1">Category</label>
                            <div class="input-group input-group-sm">
                                <select class="selectstyle form-select form-select-sm me-2" id="category" 
                                        value={props.category} onChange={props.change}>
                                    <option selected="selected" value="UI">UserUI</option>
                                    <option value="PRINT">Print</option>
                                    <option value="ART">Art</option>
                                </select>
                            </div>    
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group mt-2">
                            <label for="exampleFormControlSelect1">Sub Category</label>
                            <div class="input-group input-group-sm">
                                <select class="selectstyle form-select form-select-sm me-2" id="subcategory">
                                    {props.subcatchoice}
                                </select>
                            </div>    
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group mt-2">
                            <label for="exampleFormControlSelect1">Base Color</label>
                                <div class="input-group input-group-sm">
                                    <select class="selectstyle form-select form-select-sm me-2" id="basecolor">
                                        <option selected="selected" value="RED">Red</option>
                                        <option value="PURPLE">Purple</option>
                                        <option value="BLUE">Blue</option>
                                        <option value="GREEN">Green</option>
                                        <option value="YELLOW">Yellow</option>
                                        <option value="ORANGE">Orange</option>
                                    </select>
                                </div>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group mt-2">
                            <label for="exampleFormControlSelect1">Contrast</label>
                            <div class="input-group input-group-sm">
                                <select class="selectstyle form-select form-select-sm me-2" id="contrast">
                                    <option selected="selected" value="HIGHCONTRAST">
                                        High Contrast
                                    </option>
                                    <option value="MEDIUMCONTRAST">
                                        Medium Contrast
                                    </option>
                                    <option value="LOWCONTRAST">
                                        Low Contrast
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
           </React.Fragment>;
};

/** Searchhero()
 *  Hero display for when there has not been a search processed
 */
export function Searchhero(props){
    const buttonStyle = {
        minWidth: "10em"
    }
    return  <React.Fragment>
                <div class="heromessage mt-5">
                        <p class="display-6 align-text-bottom heromessage-text">
                            Color schemes for your web, art, or graphic design project. 
                        </p>
                </div>

                <div class="mt-5 mb-2">
                    <h3 class="heroexptext text-center">
                        Click one of the categories below to began your search.  
                    </h3>
                </div>

                <div class="d-grid gap-2">
                    <button type="button" style={buttonStyle} 
                            onClick={props.searchUI}
                            class="btn btn-outline-secondary menuchoice btn-lg px-5 p-3 mt-3">
                        UI Schemes
                    </button>
                </div>

                <div class="d-grid gap-2">
                    <button type="button" style={buttonStyle} 
                            onClick={props.searchPrint}
                            class="btn btn-outline-secondary menuchoice btn-lg px-5 p-3 mt-3">
                        Graphic Design Schemes
                    </button>
                </div>

                <div class="d-grid gap-2">
                    <button type="button" style={buttonStyle} 
                            onClick={props.searchArt}
                            class="btn btn-outline-secondary menuchoice btn-lg px-5 p-3 mt-3">
                        Art Project Schemes
                    </button>
                </div>        

            </React.Fragment>
};