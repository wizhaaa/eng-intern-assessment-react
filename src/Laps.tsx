import React from "react";

type LapProps = {
  laps: Array<number>;
};

export default function Laps({laps}: LapProps) {
  return (
    <div id="laps">
      <div>Laps</div>
      <div data-testid="lap-list">
        {laps.map((lap, i) => {
          return (
            <div className="lap" key={i}>
              {lap}
            </div>
          );
        })}
      </div>
    </div>
  );
}
