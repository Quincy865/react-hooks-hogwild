import React, { useState } from 'react';
function HogTile({ hog, hidden }) {
const [showDetails, setShowDetails] = useState(false);

  if (hidden) return null;
  return (
    <div className="hog-tile" onClick={() => setShowDetails(!showDetails)}>
      <h3>{hog.name}</h3>
      <img src={hog.image} alt={hog.name} />
      {showDetails && (
        <div>
          <p>Specialty: {hog.specialty}</p>
          <p>Weight: {hog.weight}</p>
          <p>Greased: {hog.greased ? "Yes" : "No"}</p>
          <p>Highest Medal Achieved: {hog["highest medal achieved"]}</p>
        </div>
      )}
    </div>
  );
}

export default HogTile;