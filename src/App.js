import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

import { BATTING_AVERAGES } from "./data";
import { gradients } from "./utils/constants";

import "./styles/styles.css";

function App({ finalCount, initialCount, time }) {
  const [matchCount, setCount] = useState(initialCount);
  useEffect(
    () =>
      void setInterval(() => {
        const increment = a => (a <= finalCount - 1 ? a + 1 : a);
        setCount(increment);
      }, time),
    [finalCount, time]
  );
  const rows = BATTING_AVERAGES[matchCount].map(a => ({
    ...a,
    image:
      a.country.split("/").length > 1
        ? gradients[a.country.split("/")[1]]
        : gradients[a.country]
  }));

  let height = 0;
  const transitions = useTransition(
    rows
      .slice(0, 8)
      .map(data => ({ ...data, y: (height += data.height) - data.height })),
    d => d.playerId,
    {
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height })
    }
  );
  return (
    <div style={{ width: "75%" }}>
      <h2>{`Batting Averages After ${matchCount} Matches`}</h2>
      <div className="list" style={{ height }}>
        {transitions.map(({ item, props: { y, ...rest }, key }, index) => {
          return (
            <animated.div
              key={key}
              className="card"
              style={{
                zIndex: rows.length - index,
                transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
                ...rest
              }}
            >
              <div
                className="cell"
                style={{ width: `${Number(item.average) * 10}px` }}
              >
                <div
                  className="details"
                  style={{ backgroundImage: item.image }}
                >
                  <span>{`${item.playerName} (${item.average})`}</span>
                </div>
              </div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
