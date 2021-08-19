import React, { Component } from 'react';
import './header.css';
import { RiPaintBrushLine } from "react-icons/ri";
import axios from 'axios';

class Header extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    axios.get('https://palettescolor-backend.herokuapp.com/test')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
      // Nothing
  }

  render() {
    let logoClass = `navbar-brand text-black-50 logoHeader`;
    let logopadding = `pe-2`;

    return (
        <React.Fragment>
            <nav class="navbar ">
              <div class="container">
                <a className={logoClass} >
                  <span className={logopadding}>
                    <RiPaintBrushLine />
                  </span>
                  Palette.
                </a>
                <div class="mt-2 logindiv d-flex">
                  {this.props.logButton}
                </div>
              </div>
            </nav>
        </React.Fragment>
    );
  }
}

export default Header;