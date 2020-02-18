import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const NewEvent = ({ procedures, selectDate }) => {
  const classes = useStyles();
  const [isHidden, setIsHidden] = useState(false);

  const [procedure, setProcedure] = useState({
    title: '',
    type: "procedures",
    date: selectDate
      // ["2020, 01, 14",]
  });

  useEffect(()=> {
    setProcedure({...procedure, dates: [selectDate]})
  },[selectDate])

  const submitHandler = () => {
    const filterDates = procedures.filter(el => {
      return el.title === procedure.title
        // console.log('el.title',el.dates);
        // return el.dates
      
    })
console.log('bar:',filterDates[0].dates);
console.log('baz:',[...filterDates[0].dates, selectDate]);

    fetch("/procedures", {
      credentials: "include",
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: procedure.title, dates: [...filterDates[0].dates, selectDate] })
    }

    )
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setIsHidden(!isHidden)}
      >
        Добавить новое событие
      </Button>
      {isHidden && (
        <form>
          {/* <input type="date" name="date" placeholder="введите дату" /> */}
          <p>Выберите дату на календаре</p>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Процедура</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={procedure.title}
              onChange={e => setProcedure({...procedure, title: e.target.value})}
            >
              {procedures.map(el => (
                <MenuItem key={el.title} value={el.title}>
                  {el.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <input type="submit" name="date" placeholder="Добавить" /> */}
          <Button variant="contained" color="secondary" onClick={submitHandler}>
            Добавить
          </Button>
        </form>
      )}
    </div>
  );
};

export default NewEvent;