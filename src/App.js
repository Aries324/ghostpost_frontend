import React from "react";
import "semantic-ui-css/semantic.min.css";
import CustomForm from '../src/components/Form'

const url = "http://localhost:8000/api/";
// Front End:

// Homepage that displays boasts and roasts - done
// buttons to filter the content by either boasts or roasts - done
// upvote and downvote buttons for each boast and roast
// ability to sort content based on number of votes- buttons are there but it doesn't work yet
// page to submit a boast or a roast
// Note: Try to make your React app as simple as possible. We don't need `react-redux` or `react-router` to accomplish our task. Once you get the basic functionality, feel free to extend it if you so desire. The focus of this assessment is not the frontend. We just need one to display the data.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    fetch(url + "post_review/")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          posts: data,
        })
      );
  }
  getRoasts = (event) => {
    fetch(url + "roasts")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          posts: data,
        })
      );
  };

  getBoasts = (event) => {
    fetch(url + "boasts")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          posts: data,
        })
      );
  };

  handleSortVotes = (event) => {
    const votes = [...this.state.posts];
    votes.sort(function (up, down) {
      return up.up_votes - down.down_votes;
    });
    this.setState({ posts: votes });
  };

  postUpVotes = (event) => {
    fetch(url + "post_review/" + event + "/up_vote/")
      .then((res) => res.json())
      .then((data) =>
        console.log(data)
        
      );
  };
  postDownVotes = (event) => {
    fetch(url + "post_review/" + event + "/down_votes/")
      .then((res) => res.json())
      .then((data) =>
        console.log(data)
        
      );
  };
  


  render() {
    return (
      <div>
        <button onClick={this.handleSortVotes} style={{ margin: 10 }}>
          Sort By Votes
        </button>
        <button onClick={this.getBoasts} style={{ margin: 10 }}>
          Boast
        </button>
        <button onClick={this.getRoasts} style={{ margin: 10 }}>
          Roasts
        </button>
        <CustomForm />

        <h1>Ghost Post</h1>

        {this.state.posts.map((post) => {
          return (
            <div style={{ padding: 10 }}>
              <p>Post ID: {post.id}</p>
              <p>Post: {post.content}</p>
              <button onClick={() => this.postUpVotes(post.id)}>UpVotes: {post.up_votes}</button>
              <button onClick={() => this.postDownVotes(post.id)}>DownVotes: {post.down_votes}</button>
              <p>Total: {post.total_votes}</p>
              <p>Timestamp: {post.time}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
