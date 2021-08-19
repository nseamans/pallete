import React from 'react';

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
    </React.Fragment>;
}

 export function Basecolors(){
    return <React.Fragment>        
        <option selected="selected" value="RED">Red</option>
        <option value="PURPLE">
            Purple
        </option>
        <option value="BLUE">
            Blue
        </option>
        <option value="GREEN">
            Green
        </option>
        <option value="YELLOW">
            Yellow
        </option>
        <option value="ORANGE">
            Orange
        </option>
    </React.Fragment>;
}

export function Contrast(){
    return <React.Fragment>        
        <option selected="selected" value="HIGHCONTRAST">
            High Contrast
        </option>
        <option value="MEDIUMCONTRAST">
            Medium Contrast
        </option>
        <option value="LOWCONTRAST">
            Low Contrast
        </option>
    </React.Fragment>;
}