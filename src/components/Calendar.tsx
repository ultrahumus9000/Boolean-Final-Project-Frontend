// IGNORE THIS FILE

import React, { Component, useState } from "react"
import "react-dates/initialize"
import { DateRangePicker } from "react-dates"
// import "react-dates/lib/css/_datepicker.css"
// import "bootstrap/dist/css/bootstrap.min.css"
import "../../src/calendar.css"

export default function Calendar() {
  const [startDate, setStartDate] = useState("20-02-20")
  const [endDate, setEndDate] = useState("10-10-10")
  const [focusedInput, setFocusedInput] = useState("10-10-10")

  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       startDate: null,
  //       endDate: null,
  //     }
  //   }
  //   //   ({ startDate, endDate }) => this.setState({ startDate, endDate })
  function handleChange(startDate: string, endDate: string) {
    //  this.setState({ startDate, endDate })
    setStartDate(startDate)
    setEndDate(endDate)
    console.log("startDate, endDate", startDate, endDate)
  }

  return (
    <div className="cal">
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={() => handleChange(startDate, endDate)} // PropTypes.func.isRequired,
        //   focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        //   onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
      />
      {/* <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={()=> handleChange( startDate, endDate ) } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        /> */}
    </div>
  )
}
