import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";

import BarPlot from "./barPlot";
import "./styles/styles.css";

function valuetext(value) {
  return `${value} Matches`;
}

function secondsText(value) {
  return `${value} Seconds`;
}

function App() {
  const [counter, setCounter] = useState(0);
  const [matches, setMatches] = React.useState([50, 73]);
  const [time, setTime] = React.useState(900);
  const [initialCount, finalCount] = matches;

  const handleChange = (event, newValue) => {
    setCounter(counter + 1);
    setMatches(newValue);
  };
  const handleTimeChange = (event, newValue) => {
    setTime(newValue);
    setCounter(counter + 1);
  };
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ display: "flex", padding: "48px" }}>
        <Slider
          min={200}
          max={4000}
          value={time}
          orientation="vertical"
          valueLabelDisplay="auto"
          onChange={handleTimeChange}
          getAriaValueText={secondsText}
          aria-labelledby="vertical-slider"
        />
        <Slider
          min={1}
          max={200}
          value={matches}
          orientation="vertical"
          valueLabelDisplay="on"
          onChange={handleChange}
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
      <div style={{ width: "100%" }}>
        <BarPlot
          time={time}
          key={counter}
          finalCount={finalCount}
          initialCount={initialCount}
        />
      </div>
    </div>
  );
}

export default App;
