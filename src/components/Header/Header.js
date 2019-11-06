import React, { useState, useEffect } from 'react';
// import { Papper, Avatar }from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { flexbox } from '@material-ui/system';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import moment from 'moment';
 
import { mainData } from '../../config/data';
import { grey } from '@material-ui/core/colors';
 
const useStyles = makeStyles(theme => ({
  paper: {
    // display: 'flex',
    // position: 'absolute',
    // zIndex: 1,
    // margin: 10,
    width: '20%',
    height: '100vh',

  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90,
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#f5f1f1',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [personalData, setPersonalData] = useState(mainData)

  // useEffect (()=> {
  //   localStorage.setItem("name", "Имя кота");
  //   localStorage.setItem("birthday", personalData.birthday);

  // },[])
 
const calculateAge = () => {
  let dif = moment().diff(moment(personalData.birthday), 'month');
  if (dif >= 12 ) {
    dif = `${moment().diff(moment(personalData.birthday), 'year')} г.`
  } else {
    dif = `${moment().diff(moment(personalData.birthday), 'month')} мес.`
  }
  return dif
};  

 return (
   <Paper className={classes.paper}>
     <Avatar alt="Cat" src={personalData.image} className={classes.bigAvatar}/>
     <Divider/>
     <h1>{personalData.name}</h1>
     <p>Возраст: {calculateAge()}</p>   
     <p>День рождени: {personalData.birthday.toLocaleDateString('ru')}</p>
     <Button className={classes.button}>Редактировать</Button>
   </Paper>
 )
}

export default Header;