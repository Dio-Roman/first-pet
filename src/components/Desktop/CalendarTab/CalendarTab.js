import React, { useState, useCallback, useEffect, Ref } from "react";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/core/Icon";

import MomentUtils from "@date-io/moment";
import moment from "moment";

import useStyles from "./style";

const ExpansionComponent = ({
  expanded,
  id,
  expandHandler,
  title,
  dates,
  selectEvent
}) => {
  const classes = useStyles();

  return (
    <ExpansionPanel
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
            </li> //  ref
          ))}
        </ul>
        {/* </Typography> */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

// ----------------------
const CalendarTab = props => {
  const { date, /*selectedDays,*/ setClickedDate } = props;
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [selectDate, setSelectDate] = useState("");

  let accordeon = React.createRef();

  // запрос по типу вещи
  useEffect(() => {
    fetch("/procedures") //`/${props.catName}/things`
      .then(response => response.json())
      .then(data => setState(data));
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
  // const dat = [new Date(2019, 8, 1),new Date(2019, 8, 1)]

  const [selectEvent, setSelectEvent] = useState(null);

  const [expanded, setExpanded] = useState(false);

  const expandHandler = id => (event, isExpanded) => {
    // console.log(id, isExpanded);

    setExpanded(isExpanded ? id : false);
  };

  const expandHandlerCalendar = id  => {
    // console.log(id, isExpanded);

    setExpanded( id )
  };

  // useEffect(() => {

  // }, [dateArr])

  const chooseEvent = value => {
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
        console.log(el.id);

        expandHandlerCalendar(el.id)
        // setExpa(true)
        // accordeon.current.expanded = true
        // document.querySelector("#a").expanded=true
      } //else {setSelectEvent(null)}
    });
  };

  const [value, setValue] = useState(new Date());

  return (
    <div style={{ display: "flex" }}>
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
        {state.map(el => (
          <ExpansionComponent
            key={el._id}
            expanded={expanded}
            id={el._id}
            expandHandler={expandHandler}
            title={el.title}
            dates={el.dates}
            selectEvent={selectEvent}
          />

          // <ExpansionPanel
          //   key={el._id}
          //   expanded={expanded === el._id}
          //   onClick={() => expandHandler(el._id)}
          // >
          //   <ExpansionPanelSummary
          //     expandIcon={<ExpandMoreIcon />}
          //     aria-controls="panel1a-content"
          //     // id="panel1a-header"
          //   >
          //     <Typography className={classes.heading}>
          //       {el.title} {/*Expansion Panel 1*/}
          //     </Typography>
          //   </ExpansionPanelSummary>
          //   <ExpansionPanelDetails>
          //     {/* <Typography> */}
          //     <ul>
          //       {el.dates.map(elem => (
          //         <li
          //           id={`${el._id} ${elem}`}
          //           className={
          //             selectEvent === `${el._id} ${elem}`
          //               ? `${classes.select}`
          //               : ""
          //           }
          //           key={elem}
          //         >
          //           {elem}
          //         </li> //  ref
          //       ))}
          //     </ul>
          //     {/* </Typography> */}
          //   </ExpansionPanelDetails>
          // </ExpansionPanel>
        ))}
      </div>
    </div>
  );
};

export default CalendarTab;
