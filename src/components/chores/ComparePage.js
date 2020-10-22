import React from "react";
import PropTypes from "prop-types";

const ComparePage = ({ chores, users }) => (
  <div>
    {users.map((user) => {
      return <>{user.name}</>;
    })}
  </div>
);

ComparePage.propTypes = {
  chores: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

export default ComparePage;
