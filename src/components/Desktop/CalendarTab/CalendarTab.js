import React, { useState, useCallback, useEffect, Ref, useContext } from "react";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/core/Icon";

import MomentUtils from "@date-io/moment";
import moment from "moment";

import ApiServiceContext from '../../api-service-context/api-service-context';
import NewEvent from "./NewEvent/NewEvent";
import ExpansionComponent from "./Expansion";
import useStyles from "./style";

const CalendarTab = props => {
  const apiService = useContext(ApiServiceContext);
  const { date, /*selectedDays,*/ setClickedDate } = props;
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [selectDate, setSelectDate] = useState("");

  const getProcedures = () => {
    apiService.getTodoList("/procedures")
      .then(data => setState(data));
  };

  // запрос по типу вещи
  useEffect(() => {
    getProcedures()
  }, []);

  // делает массив из {date: *, event: *} для рендера в календарь
  useEffect(() => {
    const allDates = [];
    state.map(el => {
      const { _id, dates, title } = el; //  dates: Array
      dates.map(elem => {
        allDates.push({
          date: new Date(elem),
          event: title,
          simpleDate: elem,
          id: _id
        });
      });
    });
    setDateArr(allDates);
  }, [state]);

  const selectedDays = [
    { date: new Date(2019, 8, 1), event: "д.р. кашака" },
    { date: new Date("2019, 10, 5"), event: "причесали" }
    // { date: new Date(2019-10-05), event: "причесали" }
  ];

  const [selectEvent, setSelectEvent] = useState(null);

  const [expanded, setExpanded] = useState(false);

  const expandHandler = id => (event, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };

  const expandHandlerCalendar = id  => {
    setExpanded( id )
  };

  const chooseEvent = value => {
    // console.log(value.format("YYYY, MM, DD"));
    setSelectDate(value.format("YYYY, MM, DD"))

    dateArr.map(el => {
      //  selectedDays
      if (
        el.date.toLocaleString("ru", {
          day: "2-digit",
          month: "numeric",
          year: "numeric"
        }) === value.format("DD.M.YYYY")
      ) {
        // setSelectEvent(el.event);
        setSelectEvent(`${el.id} ${el.simpleDate}`);
        // console.log(el.event);
        // console.log(accordeon.current);
        // console.log(el.id);

        expandHandlerCalendar(el.id)
        // setExpa(true)
        // accordeon.current.expanded = true
        // document.querySelector("#a").expanded=true
      } //else {setSelectEvent(null)}
    });
  };

  const [value, setValue] = useState(new Date());

  return (
    <div className={classes['calendar-tab']}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          disableToolbar
          variant="static"
          autoOk
          onAccept={value => chooseEvent(value)}
          // onAccept={state[0].dates}
          // onAccept={dat}
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
            for (let elem of dateArr) {
              //selectedDays
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
      {/* <div >
        <p>Событие : {selectEvent}</p>
      </div> */}
      <div>
        <h3>Все события:</h3>
        {state.map((el, i) => (
          <ExpansionComponent
            borderNumber={i}
            key={el._id}
            expanded={expanded}
            id={el._id}
            expandHandler={expandHandler}
            title={el.title}
            dates={el.dates}
            selectEvent={selectEvent}
          />
        ))}
      </div>
      <NewEvent procedures={state} selectDate={selectDate} getProcedures={getProcedures}/>
    </div>
  );
};

export default CalendarTab;
