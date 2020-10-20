import React from "react";
import Typography from "@material-ui/core/Typography";

import logo from "./chorescore_logo.jpg";
import "./App.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import ListChores from "./ListChores";

class App extends React.Component {
  state = {
    chores: [],
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2MDUzODNmNDQxYzUwZWNmN2VkZTUiLCJmaXJzdE5hbWUiOiJOaWNrIiwibGFzdE5hbWUiOiJBd2Vzb21lIiwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTYwMjAwNDE2MiwiZXhwIjoxNjAyMDExMzYyfQ.Ij6MjpyYEBgDvD0r0mDt5vckseTnFO9MR30bgB-GeAk",
  };

  componentDidMount() {
    var _this = this;
    this.serverRequest = axios
      .get("http://localhost:3000/api/chore", {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then(function (result) {
        console.log(result.data.data);
        _this.setState({
          chores: result.data.data,
        });
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Scroll to the top of the page to show the status message.
    document.getElementById("heading").scrollIntoView();
    this.setState({ type: "info", message: "Sending..." }, this.sendFormData);
  };

  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="h2" gutterBottom>
            Welcome to ChoreScores
          </Typography>
        </div>
        <p className="App-intro"></p>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Chore</TableCell>
                <TableCell align="right">Who</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">When</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.chores.map(function (chore) {
                var choreDate = new Date(chore.createdAt);
                return (
                  <TableRow key={chore._id}>
                    <TableCell component="th" scope="row">
                      {chore.chore}
                    </TableCell>
                    <TableCell align="right">{chore.user.firstName}</TableCell>
                    <TableCell align="right">{chore.description}</TableCell>
                    <TableCell align="right">
                      {choreDate.toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <ListChores token={this.state.token} />
      </div>
    );
  }
}

export default App;
