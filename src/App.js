import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'



// Front End:

// Homepage that displays boasts and roasts
// buttons to filter the content by either boasts or roasts
// upvote and downvote buttons for each boast and roast
// ability to sort content based on number of votes
// page to submit a boast or a roast
// Note: Try to make your React app as simple as possible. We don't need `react-redux` or `react-router` to accomplish our task. Once you get the basic functionality, feel free to extend it if you so desire. The focus of this assessment is not the frontend. We just need one to display the data.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      display: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/post_review/")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          posts: data,
        })
      );
  }
  handleRoasts = (event) => {
    const getRoast = this.state.posts.filter(
      (roast) => roast.is_boast === false
    );
    this.setState({ display: getRoast });
  };

  handleBoasts = (event) => {
    const getBoast = this.state.posts.filter(
      (boast) => boast.is_boast === true
    );
    this.setState({ display: getBoast });
  };

  handleSortVotes = (event) => {
    const votes = this.state.display.sort(function (up, down) {
      return up.up_votes - down.down_votes;
    });
    this.setState({ display: votes });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleSortVotes}>Sort By Votes</button>
        <h1>Ghost Post</h1>
        
          {this.state.posts.map((post) => {
            return (
              <div style={{ padding: 10 }}>
                <button onClick={this.handleBoasts}>Boast</button>
                <button onClick={this.handleRoasts}>Roasts</button>

                <p>Post: {this.content}</p>
                <button onClick={this.up_votes}>UpVotes</button>
                <button onClick={this.down_votes}>DownVotes</button>
                <p>Timestamp: {post.time}</p>
              </div>
            );
          })}
       
      </div>
    );
  }
}


export default App;
