import React, { Component } from "react";
import { Button, Container, Icon, Loader, Checkbox } from "semantic-ui-react";
import Axios from "axios";

const url = "http://localhost:8000/api/";

class CustomForm extends Component {
    constructor() {
        super()
        this.state = {
            content: "",
            is_boast: false
        };
    }

  handleClick = (event) => {
    event.preventDefault();
    this.createPost(this.state.content);
    this.setState({ content: "" });
  };

  handleChangeMessage = (event) => {
    this.setState({ content: event.target.value });
  };
   
    createPost = () => {
        Axios.post(
            url + "post_review/" ,
            {
                content: this.state.content,
                is_boast:this.state.is_boast
            },
            {
                headers: {

                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        ).then(res => console.log(res))
            .catch(error => console.log(error))
    };
    
    handleCheckboxChange = (event) =>
        this.setState({is_boast:event.target.is_boast})


  render() {
   
    const { loading, error } = this.props;
    return (
      <>
        <Container style={{ width: "1000px" }}>
          <h2>Write a Boast or a Roast</h2>
          <div className="compose">
            <input
              type="text"
              className="compose-input"
              placeholder="Type a message"
              onChange={this.handleChangeMessage}
              value={this.state.content}
            />
            <span>Check to Boast  </span>
            <Checkbox
              is_boast={this.state.is_boast}
              onChange={this.handleCheckboxChange}
            />
          </div>

          <Button
            type="submit"
            onClick={this.handleClick}
            disabled={this.props.loading}
            content="Send"
            labelPosition="left"
            icon="send"
            primary
            style={{ backgroundColor: "#95b9c7" }}
          />
          {loading && <Loader name="circle" color="white" />}
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Container>
      </>
    );
  }
}
export default CustomForm;
