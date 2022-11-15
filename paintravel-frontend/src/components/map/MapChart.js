import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { geoWinkel3 } from "d3-geo-projection";
import "../../styles/map/mapchart.scss";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapChart() {
  const width = 800;
  const height = 450;

  const [position, setPosition] = useState({
    coordinates: [10, 10],
    zoom: 1.1,
  });

  function handleMoveEnd(position) {
    setPosition(position);
  }
  const handleClick = (geo) => () => {
    console.log(geo);
  };

  return (
    <div>
      <ComposableMap width={width} height={height}>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "rgba(0,0,0,0.15)",
                      stroke: "rgb(255,255,255)",
                      strokeWidth: "0.5px",
                    },
                    hover: {
                      fill: "rgba(0,255,30,0.5)",
                    },
                    pressed: {
                      fill: "black",
                      outline: "none",
                    },
                  }}
                  onClick={handleClick}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
