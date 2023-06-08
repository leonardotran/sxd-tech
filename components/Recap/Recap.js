import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  recapContainer: {
    fontFamily: "Open San",
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  field: {
    marginBottom: theme.spacing(3),
  },
}));

function SurveyRecap({ formData }) {
  const classes = useStyles();

  const renderFieldValue = (value) => {
    return value ? value : "N/A";
  };

  return (
    <div className={classes.recapContainer}>
      <Typography variant="h5" className={classes.title}>
        Survey Summary: 
      </Typography>
      <Typography variant="body1" className={classes.field}>
        <strong>Gender:</strong> {renderFieldValue(formData.gender)}
      </Typography>
      <Typography variant="body1" className={classes.field}>
        <strong>Selected Option:</strong>{" "}
        {renderFieldValue(formData.selectedOption)}
      </Typography>
      <Typography variant="body1" className={classes.field}>
        <strong>Age:</strong> {renderFieldValue(formData.age)}
      </Typography>
      <Typography variant="body1" className={classes.field}>
        <strong>About:</strong> {renderFieldValue(formData.about)}
      </Typography>
    </div>
  );
}

export default SurveyRecap;
