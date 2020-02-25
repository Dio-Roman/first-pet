import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/core/Icon";

import useStyles from "./style";


const ExpansionComponent = ({
  expanded,
  id,
  expandHandler,
  title,
  dates,
  selectEvent,
  borderNumber
}) => {
  const classes = useStyles();
  
  return (
    <ExpansionPanel
      className={classes[`border${borderNumber}`]}
      key={id}
      expanded={expanded === id}
      onChange={expandHandler(id)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        // id="panel1a-header"
      >
        <Typography className={classes.heading}>
          {title} {/*Expansion Panel 1*/}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {/* <Typography> */}
        <ul>
          {dates.map(elem => (
            <li
              id={`${id} ${elem}`}
              className={
                selectEvent === `${id} ${elem}` ? `${classes.select}` : ""
              }
              key={elem}
            >
              {elem}
            </li>
          ))}
        </ul>
        {/* </Typography> */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionComponent;
