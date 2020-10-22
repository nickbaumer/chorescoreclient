import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const ListChores = ({ chores, loading }) => {
  return loading ? (
    <CircularProgress />
  ) : (
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
};

export default ListChores;
