import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.search = this.search.bind(this);
        this.state = {term: ''};
    }

    search(){
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event){
        this.setState({ term: event.target.value});
    }

    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
          this.search();
        }
      }

    render() {
        return (
            <div className="SearchBar">
                <input onKeyPress={this.handleKeyPress} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <a onClick={this.search} >SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;