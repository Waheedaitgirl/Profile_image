import React, { useState } from 'react'
import moment from 'moment' // 2.20.1
import { View } from 'react-native' // 0.0.1
import { Calendar } from 'react-native-calendars'
const _format = 'DD-MMM-YYYY' //  YYYY-MM-DD
const _today = moment().format(_format)
const _maxDate = moment().add(100, 'days').format(_format)

const WixCalendar = () => {
  const [_markedDates, setMarkedDates] = useState([_today])
  
  const onDaySelect = (day) => {
      const _selectedDay = moment(day.dateString).format(_format);
      
      let selected = true;
      if (_markedDates[_selectedDay]) {
        selected = !_markedDates[_selectedDay].selected;
      }
      const updatedMarkedDates = {..._markedDates, ...{ [_selectedDay]: { selected } } }
      setMarkedDates({ _markedDates: updatedMarkedDates });
  }
  
    return (
      <View style={{flex: 1, marginTop:100}}>
        <Calendar
            minDate={_today}
            maxDate={_maxDate}
            onDayPress={onDaySelect}
            markedDates={_markedDates}  
        />
      </View>
    );
}

export default WixCalendar
