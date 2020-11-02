import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

const AddChore = ({
  chore,
  onChange,
  onSave,
  classes,
  saving = false,
  errors,
}) => {
  let shouldError = false;
  if (errors.chore) {
    shouldError = true;
  }
  return (
    <form onSubmit={onSave}>
      <Grid
        container
        justify="center"
        className={classes.mainPaper}
        spacing={3}
      >
        <Grid item className={classes.control} />
        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid key="chore" item>
              <TextField
                type="text"
                name="name"
                value={chore.name || ""}
                onChange={onChange}
                label="Chore"
                variant="outlined"
                error={shouldError}
              />
            </Grid>
            <Grid key="desc" item>
              <TextField
                type="text"
                name="description"
                value={chore.description}
                onChange={onChange}
                label="More detail?"
                variant="outlined"
                error={errors.description}
              />
            </Grid>
            <Grid key="button" item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={saving}
              >
                {saving ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

AddChore.propTypes = {
  chore: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};

export default AddChore;
