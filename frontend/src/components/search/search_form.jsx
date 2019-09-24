import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import './search.css';

class SearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputVal: "",
            index: 0,
        };
        this.update = this.update.bind(this);        
        this.handleBoldText = this.handleBoldText.bind(this);
    }

    componentDidMount(){
        document.addEventListener("keydown", (e) => {
            let lastIdx = this.matches().length - 1;
            let searchInput = document.getElementById("search-input");
            let focused = document.activeElement === searchInput;
            let index = this.state.index;

            if (focused && e.key === "Enter" ) {
                document.getElementById(`match-${index}`).click();
            }
            if (e.key === "ArrowUp") {
                index--;
            } else if (e.key === "ArrowDown") {
                index++;
            }
            if (index < 0) {
                index = lastIdx;
            }
            else if (index > lastIdx)
                index = 0;
            this.setState({ index: index })
        });
        document.addEventListener("mouseover", (e) => {
            if (!e.target.firstChild || !e.target.firstChild.id)
                return;
            if (e.target.localName === "li") {
                let target = e.target.firstChild.id;
                this.setState({ index: parseInt(target.replace("match-", "")) });
            }
        });
        
    }

    update(event){
        event.preventDefault();
        this.setState({
            inputVal: event.currentTarget.value.toLowerCase(),
        });
        this.findStoryIdByTitle("Artitle 1");
    }

    matches() {
        const matches = [];
        if (this.state.inputVal.length === 0) {
            return [];
        }
        const input = this.state.inputVal;
        if(input === "*ALL*")
            return Object.keys(this.props.hashesToCompare);

        Object.keys(this.props.hashesToCompare).map(title => {
            for (let i = 0; i < input.length; i++) {
                if (!this.props.hashesToCompare[title][input[i]]) {
                    return [];
                }
            }
            matches.push(title);
        });
        if (matches.length === 0) {
            return [];
        }
        return matches;
    }
    findStoryIdByTitle(title){
        const find = this.props.stories.find(story => (story.title === title));
        if(find)
            return find._id;
    }
    
    handleBoldText(str){
        const handled = [];
        for (let i = 0; i < str.length; i++) {
            if (this.state.inputVal.toLowerCase().includes(str[i].toLowerCase()))
                handled.push(`<strong>${str[i]}</strong>`);
            else
                handled.push(str[i]);
        }
        return ReactHtmlParser(handled.join(""));
    }
            
    render(){
        let searchResults = this.matches().map((result, i) => {
            const handledResult = this.handleBoldText(result);
            const id = this.findStoryIdByTitle(result);
            return <li key={i} onClick={this.selectName} className={i == this.state.index ? "search-selected" : ""}><Link to={`/stories/${id}`} id={`match-${i}`}>{handledResult}</Link></li>
        });
        searchResults = <ul className="search-ul">{searchResults}</ul>

        return (
            <form className="search-form" id="search-form">
                <input className="search-input search-dropdown" id="searchBar" type="text" onChange={this.update} placeholder="Search for stories..."/>
                {searchResults}

            </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        stories: Object.values(state.entities.stories)
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, null)(SearchForm);