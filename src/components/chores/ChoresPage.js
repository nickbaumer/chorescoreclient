import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as choreActions from "../../redux/actions/choreActions";
import * as userActions from "../../redux/actions/userActions";

import AddChore from "./AddChore";
import ListChores from "./ListChores";
import ComparePage from "./ComparePage";

import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { newChore } from "../../mockData";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";

function ChoresPage({
  chores,
  users,
  loadChores,
  loadUsers,
  saveChore,
  currentUser,
  loading,
  deleteChore,
  ...props
}) {
  const [chore, setChore] = useState({ ...props.chore });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState(false);
  const [open, setOpen] = useState(false); // for snackbar alert (needs refining)
  const [mobileOpen, setMobileOpen] = useState(false);

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
  }, []); // not convinced about this dependency array but it removes the eslint warning

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
    if (!choreIsValid()) return;
    setSaving(true);
    saveChore(chore)
      .then(() => {
        setSaving(false);
        setOpen(true);
        setChore({ name: "", description: "" });
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleDelete(chore) {
    // insert toast for delete confirmation here
    deleteChore(chore);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setChore((prevChore) => ({
      ...prevChore,
      [name]: value,
    }));
  }

  const drawerWidth = 180;

  const useStyles = makeStyles((theme) => ({
    root: {
      // flexGrow: 1,
      display: "flex",
    },
    paper: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    control: {
      padding: theme.spacing(2),
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    mainPaper: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        padding: theme.spacing(2),
      },
    },
    table: {
      minWidth: 600,
      padding: 4,
    },
    addChore: {
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

  function handleStatsButton() {
    setStats(!stats);
    console.log(classes.appBar.width);
  }

  const { window } = props;
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key="Chores">
          <ListItemIcon>
            <AssignmentIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Chores" />
        </ListItem>
        <ListItem button key="Stats" onClick={handleStatsButton}>
          <ListItemIcon>
            <BarChartIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItem>
        <ListItem button key="Household">
          <ListItemIcon>
            <BarChartIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Household" />
        </ListItem>
        <ListItem button key="Profile">
          <ListItemIcon>
            <BarChartIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const vertical = "top";
  const horizontal = "center";

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Chore Scores
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <AddChore
          onChange={handleChange}
          onSave={handleSave}
          chore={chore}
          classes={classes}
          saving={saving}
          errors={errors}
        />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity="success">
            Chore added successfully!
          </Alert>
        </Snackbar>
        <div align="center" width="100%">
          {stats ? (
            <ComparePage compare={users} classes={classes} />
          ) : (
            <ListChores
              chores={chores}
              loading={loading}
              onDelete={handleDelete}
              classes={classes}
            />
          )}
        </div>
      </main>
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
  deleteChore: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired,
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
  deleteChore: choreActions.deleteChore,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoresPage);
