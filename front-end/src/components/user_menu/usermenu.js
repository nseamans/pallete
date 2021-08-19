import React from 'react';
import Search from '../scheme_search/search';
import Addscheme from '../scheme_add/addscheme';
import Userschemelist from '../scheme_add/userschemes';

class Usermenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {editoption: 'search'};
      this.searchaction = this.searchaction.bind(this);
      this.addaction = this.addaction.bind(this);
      this.editaction = this.editaction.bind(this);
    }
  
    searchaction(event){
      this.setState({editoption: event.target.value});
    }
  
    addaction(event){
      this.setState({editoption: event.target.value});
    }
  
    editaction(event){
      this.setState({editoption: event.target.value});
    }
  
    render() {
      
      let currentdisplay ;
      if(this.state.editoption === 'add'){
        currentdisplay =  <div class="container">
                            <Addscheme />
                          </div>;
      };
      if(this.state.editoption === 'edit'){
        currentdisplay =  <div class="container">
                            <Userschemelist /> 
                          </div>;
      };
      if(this.state.editoption === 'search'){
        currentdisplay = <Search />;
      };
  
      let displaymenu;
      if(this.props.logstatus === 'logout'){
        displaymenu = <React.Fragment>
                        <div class="container pb-3">
                          <div class="row">
                            <div class="col">
                              <div class="d-grid gap-1">
                                <button class="editmenubutton" 
                                        onClick={this.searchaction} 
                                        value='search'>
                                  Search 
                                </button>
                              </div>
                            </div>
                            <div class="col">
                              <div class="d-grid gap-1">
                                <button class="editmenubutton" 
                                        onClick={this.addaction} 
                                        value='add'>
                                  Add 
                                </button> 
                              </div>
                            </div>
                            <div class="col">
                              <div class="d-grid gap-1">
                                <button class="editmenubutton" 
                                        onClick={this.editaction} 
                                        value='edit'>
                                  Edit 
                                </button> 
                              </div>
                            </div>
                          </div>
                        </div>
                        {currentdisplay}
                      </React.Fragment>;
      } else {
        displaymenu = <Search />;
      }
  
      return displaymenu;
    }
  }

  export default Usermenu;