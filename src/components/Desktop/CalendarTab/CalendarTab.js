import React, { useState, useCallback, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import useStyles from "./style";
import moment from "moment";

const CalendarTab = props => {
  const { date, /*selectedDays,*/ setClickedDate } = props;
  const classes = useStyles();
  const [state, setState] = useState([]);

  // запрос по типу вещи
  useEffect(() => {
    fetch("/procedures") //`/${props.catName}/things`
      .then(response => response.json())
      .then(data => setState(data));
  }, []);

  const selectedDays = [
    { date: new Date(2019, 8, 1), event: "д.р. кашака" },
    { date: new Date(2019, 10, 5), event: "причесали" }
  ];

  const [selectEvent, setSelectEvent] = useState(null);

  const chooseEvent = value => {
    selectedDays.map(el => {
      if (
        el.date.toLocaleString("ru", {
          day: "2-digit",
          month: "numeric",
          year: "numeric"
        }) === value.format("DD.M.YYYY")
      ) {
        setSelectEvent(el.event);
        console.log(el.event);
      } //else {setSelectEvent(null)}
    });
  };

  const [value, setValue] = useState(new Date());

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          disableToolbar
          variant="static"
          autoOk
          onAccept={value => chooseEvent(value)}
          // disablePast
          openTo="date"
          value={value}
          onChange={value => {
            setValue(value);
            // const finded = selectedDays.findIndex((item, index) => {
            //   return item.date.toString() === value.toString()
            // });

            // setClickedDate(finded);
          }}
          renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
            for (let elem of selectedDays) {
              const { date } = elem;
              if (date.toJSON() === day.toJSON() && isInCurrentMonth) {
                return <div className={classes.freeDays}>{dayComponent}</div>;
              }
            }
            return (
              <div /*className={classes.disable_date}*/>{dayComponent}</div>
            );
          }}
        />
      </MuiPickersUtilsProvider>
      <div>
        <p>Событие : {selectEvent}</p>
      </div>
      <div>
        <h3>Все события:</h3>
        <ul>
          {state.map(el => (
            <li key={el._id}>{el.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarTab;
