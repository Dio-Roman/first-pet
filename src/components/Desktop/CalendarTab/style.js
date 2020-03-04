import { makeStyles } from "@material-ui/styles";

const borderCommon = "5px solid";

const useStyles = makeStyles(theme => ({
  "calendar-tab": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1em",
    justifyItems: 'center',
  },
  freeDays: {
    "& button": {
      border: "1px solid #2196f3",
      borderRadius: "50%"
    }
  },
  disable_date: {
    "& button": {
      color: "rgba(0, 0, 0, 0.38)"
    },
    "& .MuiPickersDay-current": {
      color: "rgba(33,150,243,0.86)"
    },
    "& .MuiPickersDay-current.MuiPickersDay-daySelected": {
      color: "rgba(0, 0, 0, 0.38)"
    }
  },
  select: { border: "2px solid #f2804a" },
  // borderCommon: "2px solid",
  border: [
    { borderLeft: `${borderCommon} red ` },
    { borderLeft: `${borderCommon} green ` },
    { borderLeft: `${borderCommon} blue ` },
    { borderLeft: `${borderCommon} yellow ` },
    { borderLeft: `${borderCommon} grey ` },
    { borderLeft: `${borderCommon} brown ` }
  ],

  border0: { borderLeft: `${borderCommon} red ` },
  border1: { borderLeft: `${borderCommon} green ` },
  border2: { borderLeft: `${borderCommon} blue ` },
  border3: { borderLeft: `${borderCommon} yellow ` },
  border4: { borderLeft: `${borderCommon} grey ` },
  border5: { borderLeft: `${borderCommon} brown ` }
}));

export default useStyles;
