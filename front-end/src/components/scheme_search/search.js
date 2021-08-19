import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './search.css';

import Searchresults from './searchresults';
import {UiInfo, Print, Art, SearchOptions, Searchhero} 
    from './functions/search_functions';


class Search extends Component {
    constructor() {
            super();
            this.state = {
                category: 'UI',
                searchresults: {},
                menu: false
            };

            this.changeCategory = this.changeCategory.bind(this);
            this.searchMenuControl = this.searchMenuControl.bind(this);
            this.searchMenu = this.searchMenu.bind(this);
            this.searchUI = this.searchUI.bind(this);
            this.searchPrint = this.searchPrint.bind(this);
            this.searchArt = this.searchArt.bind(this);
            this.resetSearch = this.resetSearch.bind(this);
        }

        /** componentWillUnmount()
         *  Clears the search results when the component is unmounted
         */
        componentWillUnmount() {
            this.setState({
                searchresults: {}
            });
        }

        /** changeCategory()
         *  Change the category to search the database with
         */
        changeCategory(event) {
            this.setState({category: event.target.value});
        }


        /** searchMenuControl()
         *  Controls the display of the search menu
         */
        searchMenuControl(){
            if(this.state.menu === true){
                this.setState({menu: false});
            } else {
                this.setState({menu: true});
            }
        }

        /** searchMenu()
         *  Searches for schemes based on the search menu choices
         *  in the SearchOptions() funciton
         */
        searchMenu() {
            const info = {
                category: document.getElementById("category").value,
                subcategory: document.getElementById("subcategory").value,
                basecolor: document.getElementById("basecolor").value,
                contrast: document.getElementById("contrast").value,
                }
            axios({
                method: 'post',
                url: 'https://palettescolor-backend.herokuapp.com/colors/get_schemes',
                data: info
            }).then(res => {
                let results = res.data;
                this.setState({
                    searchresults: results,
                    menu: true
                });
            })
        };

        /** searchUI()
         *  Retrieves schemes in the UI category
         */
        searchUI(){
            axios({
                method: 'get',
                url: 'https://palettescolor-backend.herokuapp.com/colors/get_ui'
            }).then(res => {
                let results = res.data;
                this.setState({
                    searchresults: results,
                    menu: true
                });
            })

        }

        /** searchPrint()
         *  Retrieves schemes in the Print category
         */
        searchPrint(){
            axios({
                method: 'get',
                url: 'https://palettescolor-backend.herokuapp.com/colors/get_print'
            }).then(res => {
                let results = res.data;
                this.setState({
                    searchresults: results,
                    menu: true
                });
            })

        }

        /** searchArt()
         *  Retrieves schemes in the Art category
         */
        searchArt(){
            axios({
                method: 'get',
                url: 'https://palettescolor-backend.herokuapp.com/colors/get_art'
            }).then(res => {
                let results = res.data;
                this.setState({
                    searchresults: results,
                    menu: true
                });
            })
        }

        /** resetSearch()
         *  This resets the search to the hero search menu
         */
        resetSearch(){
            this.setState({ 
                menu: false,
                searchresults: {} 
            });
        }

        render() {

            // Renders the subcategory options
            let subcatchoice;
            if(this.state.category === "UI"){
                subcatchoice = UiInfo();
            } else if(this.state.category === "PRINT"){
                subcatchoice = Print();
            } else if(this.state.category === "ART"){
                subcatchoice = Art();
            } else {
                subcatchoice = UiInfo();
            }

            // logic to display results
            let searchitems; 
            const resetsearch   =   <React.Fragment>
                                        <div  class="row">
                                            <div class="col-3" />
                                            <div class="col-6">
                                                <div class="d-grid gap-2">
                                                    <button class="btn btnsearch"  
                                                            onClick={this.resetSearch}>
                                                        Restart your Search
                                                    </button>    
                                                </div>  
                                            </div>
                                            <div class="col-3" />
                                        </div>
                                    </React.Fragment>;
                                    
            if(!_.isEmpty(this.state.searchresults) || this.state.menu === true){
                console.log(this.state.searchresults.length);
                if(this.state.searchresults.length > 0){
                    searchitems =   <React.Fragment>
                                        <Searchresults results = {this.state.searchresults}/>
                                        {resetsearch}
                                    </React.Fragment>;  
                } else {
                    searchitems =   <React.Fragment>
                                        <div class="searchwindow_results pe-3 pb-2"> 
                                            <h3>There were no results from this query.</h3>
                                        </div>
                                        {resetsearch}
                                    </React.Fragment>;
                }
            } else {
                searchitems =   <React.Fragment>
                                    <Searchhero searchUI = {this.searchUI} 
                                                searchPrint = {this.searchPrint} 
                                                searchArt = {this.searchArt} />
                                </React.Fragment>;
            };

            return (
                <div class="container">
                    <SearchOptions  change = {this.changeCategory}
                                    category = {this.state.category}
                                    subcatchoice = {subcatchoice} />
                                <div class="row mt-3 mb-3">
                                    <div class="col-sm">
                                        <div class="form-group mt-2 mb-2">
                                            <div class="d-grid gap-2">
                                                <button type="button" class="btn btnsearch" 
                                                        onClick={this.searchMenu}>
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    {searchitems} 
                </div>
            );
        };
    };

export default Search;