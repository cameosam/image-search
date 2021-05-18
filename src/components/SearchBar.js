import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <form onSubmit={this.onFormSubmit} className="ui form">
            <div className="field">
              <label>BTS Image Search</label>
              <input
                type="text"
                value={this.state.term}
                onChange={(e) => this.setState({ term: e.target.value })}
              />
            </div>
          </form>
        </div>
        <div className="ui segment">
          <button
            className="ui button"
            onClick={() => this.props.loadMore(this.state.term)}
          >
            Next page
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
