import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import logo from "./chorescore_logo.jpg";

import { makeStyles } from "@material-ui/core/styles";

import * as choreActions from "../../redux/actions/choreActions";
import * as userActions from "../../redux/actions/userActions";

import AddChore from "./AddChore";
import { newChore } from "../../mockData";
import ListChores from "./ListChores";
import Button from "@material-ui/core/Button";
import ComparePage from "./ComparePage";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// import ListChores from "./ListChores";

function ChoresPage({
  chores,
  users,
  loadChores,
  loadUsers,
  saveChore,
  currentUser,
  loading,
  ...props
}) {
  const [chore, setChore] = useState({ ...props.chore });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState(false);
  const [open, setOpen] = useState(false); // for snackbar alert (needs refining)

  useEffect(() => {
    if (chores.length === 0) {
      loadChores().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (users.length === 0) {
      loadUsers().catch((error) => {
        alert("Loading users failed" + error);
      });
    }
  }, []);

  function choreIsValid() {
    const { name, userId } = chore;
    const errors = {};

    if (!name) errors.chore = "Chore name is required!";
    if (!userId) errors.userId = "User is required!";

    setErrors(errors);
    return Object.keys(errors).length === 0; // if there are no errors, true is returned as chore is valid
  }

  function handleSave(event) {
    event.preventDefault();
    chore.userId = currentUser;
    console.log(chore.userId);
    if (!choreIsValid()) return;
    setSaving(true);
    saveChore(chore)
      .then(() => {
        setSaving(false);
        setOpen(true);
      })
      .catch((error) => {
        setSaving(false);

        setErrors({ onSave: error.message });
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setChore((prevChore) => ({
      ...prevChore,
      [name]: value,
    }));
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <div className="App-header">
        <img src={logo} height="100" className="App-logo" alt="logo" />
        <Typography variant="h2" gutterBottom>
          Welcome to ChoreScores
        </Typography>
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={() => setStats(!stats)}
        >
          Stats
        </Button>
      </div>
      <div align="center">
        <AddChore
          onChange={handleChange}
          onSave={handleSave}
          chore={chore}
          classes={classes}
          saving={saving}
          errors={errors}
        />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Chore added successfully!
          </Alert>
        </Snackbar>
      </div>
      <div align="center">
        {stats ? (
          <ComparePage chores={chores} users={users} />
        ) : (
          <ListChores chores={chores} loading={loading} />
        )}
      </div>
    </div>
  );
}

ChoresPage.propTypes = {
  chores: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  loadChores: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  chore: PropTypes.object.isRequired,
  saveChore: PropTypes.func.isRequired,
  currentUser: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  course: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const chore = newChore; // needs consideration for editing existing courses
  return {
    chores:
      state.users.length === 0
        ? []
        : state.chores.map((chore) => {
            return {
              ...chore,
              // both of these append new properties to chore that are then referenced in the props
              userName: state.users.find((u) => u.id === chore.userId).name, // find actual username // users also needs refining into only relevant users not entire db
              date: new Date(chore.createdAt), // converts date
            };
          }),
    users: state.users,
    currentUser: state.currentUser,
    chore: chore,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadChores: choreActions.loadChores,
  loadUsers: userActions.loadUsers,
  saveChore: choreActions.saveChore,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoresPage);
