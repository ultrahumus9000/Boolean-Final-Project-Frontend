import React from "react"

export default function Facility({
  options,
  handleChangeFacility,
  newListing,
}) {
  const optionsList = Object.keys(options).map(facility => (
    <li key={facility} className="cboxLi">
      <input
        className="hidden"
        onChange={handleChangeFacility}
        type="checkbox"
        name="facility"
        value={facility}
        id={facility}
      />
      <label htmlFor={facility}>{options[facility]}</label>
    </li>
  ))

  return <ul className="checkboxUl">{optionsList}</ul>
}
