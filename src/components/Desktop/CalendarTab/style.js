import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  freeDays: {
    '& button': {
      border: '1px solid #2196f3',
      borderRadius: '50%'
    }
  },
  disable_date: {
    '& button': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
    '& .MuiPickersDay-current': {
        color: 'rgba(33,150,243,0.86)'
    },
    '& .MuiPickersDay-current.MuiPickersDay-daySelected': {
      color: 'rgba(0, 0, 0, 0.38)'
    }
  },
  select: {border: "2px solid #f2804a"}
}));

export default useStyles;