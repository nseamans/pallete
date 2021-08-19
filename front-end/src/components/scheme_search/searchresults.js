import React, { Component } from 'react';
import _ from 'lodash';
import './search.css';

import Colorcard from './functions/searchresults_functions';

function pageCounter(division, resultcount){
    let pagenumber = Math.floor(resultcount / division);
    if ((resultcount % division) > 0 ) {
      pagenumber += 1; }
    return {
      size: resultcount,
      pagecount: pagenumber,
      increment: division
    }
  };

class Searchresults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countplace: 1,
      choices: {}
    }
    this.testFunction = this.testFunction.bind(this);
  }

  testFunction(event){
    const info = parseInt(event.target.innerHTML);
    this.setState({
      countplace: info
    });
  }

  render() {
    const pagevars = pageCounter(5, this.props.results.length);
    let pagarray = [];
    for(let i = 0; i < pagevars.pagecount; i++){
      pagarray.push(
        <li class="page-item" onClick={this.testFunction}>
          <a class="page-link"  >
            {i + 1}
          </a>
        </li>
      );
    }

    let pageresults = this.props.results.slice(0, 1);
    let lengthcheck = this.props.results.length % 5;
    let countstart, countend, remainder;
    
    if((this.state.countplace !== pagevars.pagecount) || (lengthcheck === 0)){
      if (this.state.countplace > 1){
        countstart = (5 * this.state.countplace) - 5;
      } else countstart = 0;
      countend = (5 * this.state.countplace);
      pageresults = this.props.results.slice(countstart, countend);
    } else {
      remainder = this.props.results.length - (this.props.results.length % 5);
      countend = (5 * this.state.countplace) - 1;
      pageresults = this.props.results.slice(remainder, countend);
    };

    return (
        <React.Fragment>    
            <div class="row pb-2">
              <div class="col">
                <nav aria-label="Search Pagination">
                  <ul class="pagination justify-content-begin">                
                    {pagarray.map((pagebutton) => (
                      <React.Fragment>
                        {pagebutton}
                      </React.Fragment>
                    ))}
                  </ul>
                </nav>
              </div>
              <div class="col">
                <h6 class="pagecount">
                  Page Number: {this.state.countplace}
                </h6>
              </div>
            </div> 
            <div class="searchwindow_results pe-3 pb-2"> 
              {pageresults.map((scheme) => (
                  <React.Fragment>
                      {scheme.length}
                      <Colorcard scheme = {scheme}/>
                  </React.Fragment>
              ))}
            </div>  
        <h6 class="pagecount">
          Number of Results: {this.props.results.length}
        </h6>
        </React.Fragment>
    );
  }
};

export default Searchresults;