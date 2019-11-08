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
// import axios from 'axios';

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

  useEffect(() => {
    // const result = axios({
    //   method: 'post',
    //   url: "/api/cat",
    //   // data
    // });
    // return result;
    fetch("/cat")
      .then(response => {
        if (!response.ok) {
          throw new Error (response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(data => setState(data))
  },[])

  // useEffect(() => {
  //   if (!localStorage.getItem('Когтеточка')) {
  //     setState(things)
  //   } else {
  //     let newState = [];
  //     for(let i=0; i<localStorage.length; i++) {
  //       newState.push({id: +i, name: localStorage.key(i), isDone: JSON.parse(localStorage.getItem(localStorage.key(i))) })  ;
  //     }
  //     setState(newState)

  //   }
  // },[])

  // useEffect (() => {
  //   state.map(el => {
  //     localStorage.setItem(el.name, el.isDone)
  //   })
  // },[state])
  
  const handleChange = item => {
    setState(
      state.map(el => {
        if (el.id === item.id) {
          el.isDone = !el.isDone;
        }
        return el;
      })
    );
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
          {state && state.map(item => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  checked={item.isDone}
                  onChange={() => handleChange(item)}
                  value={item.name}
                />
              }
              label={item.name}
            />
          ))}

        </FormGroup>
      </FormControl>
    </div>
  );
};

export default ThingsTab;
