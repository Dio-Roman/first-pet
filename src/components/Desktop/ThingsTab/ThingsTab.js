import React, { useContext, useState, useEffect } from "react";
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
import ApiServiceContext from '../../api-service-context/api-service-context';

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
  const apiService = useContext(ApiServiceContext)

  const [state, setState] = useState([]);

  // запрос по типу вещи
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    apiService.getTodoList("/things")  //`/${props.catName}/things`
      .then(data => setState(data));
  };

  const handleChange = item => {
    const { _id, isDone, type } = item;
    apiService.setEvent("/things", { _id: _id, isDone: !isDone, type: type } )
     .then(data => setState(data));
  };

  return (
    <div className={classes.root}>
      <h1>Необходимые вещи</h1>
      <FormControl component="fieldset" className={classes.formControl}>
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
