import React, { useState } from 'react';
import hogs from '../../porkers_data';
import HogTile from '../Hogtile/Hogtile';

function HogList() {
   const [hogData, setHogData] = useState(hogs);
   const [showGreasedOnly, setShowGreasedOnly] = useState(false);
   const [sortOption, setSortOption] = useState(null);
   const [hiddenHogs,] = useState(new Set());

   const displayedHogs = hogData
      .filter(hog => (showGreasedOnly ? hog.greased : true))
      .sort((a, b) => {
         if (sortOption === "name") return a.name.localeCompare(b.name);
         if (sortOption === "weight") return a.weight - b.weight;
         return 0;
      });

   function handleAddHog(event) {
      event.preventDefault();
      const form = event.target;
      const newHog = {
         name: form.name.value,
         specialty: form.specialty.value,
         greased: form.greased.checked,
         weight: parseFloat(form.weight.value),
         "highest medal achieved": form.highestMedal.value,
         image: "https://placekitten.com/200/200",
      };
      setHogData([...hogData, newHog]);
      form.reset();
   }

   return (
      <div>
         <button onClick={() => setShowGreasedOnly(!showGreasedOnly)}>
            {showGreasedOnly ? "Show All Hogs" : "Show Only Greased Hogs"}
         </button>
         <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by...</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
         </select>
         <form onSubmit={handleAddHog}>
            <input name="name" placeholder="Name" required />
            <input name="specialty" placeholder="Specialty" required />
            <input type="number" name="weight" placeholder="Weight" required />
            <input type="checkbox" name="greased" /> Greased
            <select name="highestMedal">
               <option value="bronze">Bronze</option>
               <option value="silver">Silver</option>
               <option value="gold">Gold</option>
               <option value="platinum">Platinum</option>
               <option value="diamond">Diamond</option>
            </select>
            <button type="submit">Add Hog</button>
         </form>
         <div className="hog-tiles">
            {displayedHogs.map((hog, index) => (
               <HogTile key={index} hog={hog} hidden={hiddenHogs.has(hog.name)} />
            ))}
         </div>
      </div>
   );
}

export default HogList;

