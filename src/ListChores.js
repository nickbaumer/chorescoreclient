import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class ListChores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chore: "",
      description: "",
      when: new Date().getTime(),
      token: props.token,
    };
  }

  updateChore = (event) => {
    this.setState({ chore: event.target.value });
  };

  updateDesc = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/chore",
        {
          chore: this.state.chore,
          description: this.state.description,
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }
      )

      .then(function (result) {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ description: "" });
    this.setState({ chore: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            type="text"
            name="chore"
            value={this.state.chore}
            onChange={this.updateChore}
            label="Chore"
            variant="outlined"
          />
          <TextField
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.updateDesc}
            label="More detail?"
            variant="outlined"
          />
          <input type="hidden" name="when" value={this.state.when} />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default ListChores;
