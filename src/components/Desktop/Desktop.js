import React, { useState } from "react";
import { Link } from "react-router-dom";

import CalendarTab from "./CalendarTab/CalendarTab";
import PrepareHomeTab from "./PrepareHomeTab/PrepareHomeTab";
import ThingsTab from "./ThingsTab/ThingsTab";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const Desktop = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Вещи" />
          <Tab label="Подготовка дома" />
          <Tab label="Календарь ухода" />
        </Tabs>
        
      </AppBar>
<Link to={"/"}>
          <Button variant="contained" color="secondary">
            Выход
          </Button>
        </Link>
      <TabPanel value={value} index={0}>
        <ThingsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PrepareHomeTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CalendarTab />
      </TabPanel>
    </div>
  );
};

export default Desktop;
