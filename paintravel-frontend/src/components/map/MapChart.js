import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Sphere,
  Graticule,
} from "react-simple-maps";
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
  const onCLick = (e) => {
    console.dir(e.target);
  };
  const dbClickHandler = (e) => {
    console.log(position.coordinates);
    console.dir();
  };
  return (
    <div
      className="mapContainer"
      style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
      <ComposableMap
        width={width}
        height={height}
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#EEE",
                    },
                    hover: {
                      fill: "#F53",
                    },
                    pressed: {
                      fill: "#E42",
                    },
                  }}
                  onClick={dbClickHandler}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
