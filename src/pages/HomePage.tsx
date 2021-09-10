import React, { SyntheticEvent, useEffect } from "react"
import useStore from "../store"
import Filter from "../components/Filter"
import HouseCard from "../components/HouseCard"

export default function HomePage() {
  const housesArray = useStore(store => store.houses)
  const fetchAllHouses = useStore(store => store.fetchAllHouses)

  useEffect(() => {
    fetchAllHouses()
  }, [])

  if (housesArray.length === 0) {
    return <h1> we are loading for you </h1>
  }
  console.log("housesArray in home", housesArray)
  return (
    <div className="main">
      <Filter />
      <div className="houses-section">
        {housesArray.map(house => (
          <HouseCard
            key={house.id}
            image={house.pictures[0]}
            name={house.name}
            city={house.city}
            price={house.price}
            houseId={house.id}
          />
        ))}
      </div>
    </div>
  )
}
