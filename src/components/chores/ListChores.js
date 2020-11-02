import React, { useState } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ListChores = ({ chores, loading, onDelete, classes }) => {
  const [delChores, setDelChores] = useState(false);
  return loading ? (
    <CircularProgress />
  ) : (
    <TableContainer
      component={Paper}
      position="fixed"
      className={classes.mainPaper}
    >
      <Table aria-label="simple table" size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Chore</TableCell>
            <TableCell align="right">Who</TableCell>
            <TableCell align="right">Description</TableCell>

            <TableCell align="right">When</TableCell>
            <TableCell align="right">
              <IconButton
                onClick={() => {
                  setDelChores(!delChores);
                }}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chores.map((chore) => {
            return (
              <TableRow key={chore.id}>
                <TableCell component="th" scope="row">
                  {chore.name}
                </TableCell>
                <TableCell align="right">{chore.userName}</TableCell>
                <TableCell align="right">{chore.description || ""}</TableCell>

                <TableCell align="right">
                  {chore.date.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {delChores && (
                    <IconButton
                      id={chore.id}
                      size="small"
                      onClick={() => onDelete(chore)}
                    >
                      <DeleteForeverIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ListChores.propTypes = {
  chores: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  delChores: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default ListChores;
