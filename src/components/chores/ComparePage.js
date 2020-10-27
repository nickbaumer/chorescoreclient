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

const ComparePage = ({ compare }) => {
  return !compare ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Who</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compare.map((c) => {
            return (
              <TableRow key={c.id}>
                <TableCell component="th" scope="row">
                  {c.name}
                </TableCell>
                <TableCell align="right">{c.totalChores}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ComparePage.propTypes = {
  compare: PropTypes.array.isRequired,
};

export default ComparePage;
