import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { things } from "../../../config/data";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

const ThingsTab = () => {
  const classes = useStyles();

  const [state, setState] = useState([]);
  // const [state1, setState1] = useState([]);

  // запрос по типу вещи
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch("/things") //`/${props.catName}/things`
      .then(response => response.json())
      .then(data => setState(data));
  };

  const handleChange = item => {
    const { _id, isDone, type } = item;
    fetch("/things", {
      credentials: "include",
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: _id, isDone: !isDone, type: type })
    })
      .then(response => response.json())
      .then(data => setState(data));
  };

  return (
    <div className={classes.root}>
      <h1>Необходимые вещи</h1>
      {/* <List>
      <ListItem> 
        <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
            label="Gilad Gray"
          /></ListItem>
      </List> */}

      <FormControl component="fieldset" className={classes.formControl}>
        {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
        <FormGroup>
          {!!state.length &&
            state.map(item => (
              <FormControlLabel
                key={item._id}
                control={
                  <Checkbox
                    checked={item.isDone}
                    onChange={() => handleChange(item)}
                    value={item.title}
                  />
                }
                label={item.title}
              />
            ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default ThingsTab;
