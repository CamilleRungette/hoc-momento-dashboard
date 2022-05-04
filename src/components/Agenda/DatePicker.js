import React, { useState, forwardRef , useImperativeHandle} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import TextField from '@mui/material/TextField';
import { BiMinusCircle } from "react-icons/bi";

const DatePicker = forwardRef(({id, getState}, ref) => {

  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const [state, setState] = useState({
    place: "",
    address: "",
    city:""
  });
  let array = ['address', 'city', 'place'];

  const handleDateChange = (prop) => (e) => {
    setDate({...date, [prop]: `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} ${e.getHours()}:${e.getMinutes()}`});
  };

  const handleState = (prop) => (e) => {
    setState({...state, [prop]: e.target.value})
  }


  const removeDate = i => {
    // let array = [...dates];
    // array.splice(i, 1);
    // setDate(array);
  };

  useImperativeHandle(ref, () => ({
    sendState(){
      let array2 = {...date};
      array.map(id => {
        return array2[id] = document.getElementById(id).value;
      });
      getState(array2);
    }
  }));

  console.log(state);

  return (
    <div className='dates' key={Math.floor(Math.random() * 1000000)}>
      {/* <div className='date-picker-div input-form' key={Math.floor(Math.random() * 10000)}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
          <DateTimePicker
            autoOk
            label="Début"
            inputVariant='outlined'
            ampm={false}
            format="dd/MM/yyyy HH:mm"
            onChange={handleDateChange('startDate')}
            value={date.startDate}
            />
        </MuiPickersUtilsProvider>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
        <DateTimePicker
            label="Fin"
            inputVariant='outlined'
            ampm={false}
            format="dd/MM/yyyy HH:mm"
            onChange={handleDateChange('endDate')}
            value={date.endDate}
            />
        </MuiPickersUtilsProvider>
        <BiMinusCircle className='remove-icon pointer' onClick={() => removeDate(i)} />
      </div> */}

      <div className='input-form adress-line'>
        <TextField
            id="place"
            name="place"
            label="Lieu"
            className="input-form full-width"
            onChange={handleState('place')}
          />
          <TextField
            id='city'
            name="city"
            label="Ville"
            className="input-form full-width"
          />
      </div>
      <div className="input-form">
        <TextField
          id="address"
          name="address"
          label="Adresse"
          className="input-form full-width"
        />
      </div>
    </div>
  )
});

export default DatePicker