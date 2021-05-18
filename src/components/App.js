import React from "react";
import GoogleImages from "google-images";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

class App extends React.Component {
  state = {
    images: [],
    pageNo: 1,
    errorMessage: null,
  };

  onSearchSubmit = async (term, clear = true) => {
    try {
      const client = new GoogleImages(
        process.env.REACT_APP_CSE_ID,
        process.env.REACT_APP_API_KEY
      );

      const response = await client.search(term + " bts", {
        page: clear ? 1 : this.state.pageNo,
        type: "face",
        size: "xxlarge",
        safe: "high",
      });

      this.setState({ images: response });
      this.setState({ pageNo: clear ? 2 : this.state.pageNo + 2 });
    } catch (e) {
      this.setState({
        errorMessage:
          e.statusMessage === "Too Many Requests"
            ? e.statusMessage + ". Please come back tomorrow!"
            : e.statusMessage,
      });
    }
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar
          loadMore={async (term) => this.onSearchSubmit(term, false)}
          onSubmit={this.onSearchSubmit}
        />
        {this.state.errorMessage}
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
