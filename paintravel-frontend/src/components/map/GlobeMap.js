import React, { useRef, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "../../styles/map/globeMap.scss";

const GlobeMap = () => {
  /* Chart code */
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        homeGeoPoint: { longitude: 127, latitude: 36 },
        homeZoomLevel: 0,
        panX: "rotateX",
        panY: "rotateY",
        wheelY: "zoom",
        zoomStep: 10,
        projection: am5map.geoOrthographic(),
      })
    );

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    // polygonSeries.mapPolygons.template.events.on("click", function (ev) {
    //   polygonSeries.zoomToDataItem(ev.target.dataItem);
    //   console.log(ev.target.dataItem);
    // });

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: "#284ef9d6",
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: "rgba(255,0,0,0.5)",
    });

    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    let backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: "rgba(255,255,255,0.2)",
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Set up events
    let previousPolygon;

    polygonSeries.mapPolygons.template.on("active", function (active, target) {
      if (previousPolygon && previousPolygon != target.dataItem) {
        previousPolygon.set("active", false);
        unSelectCountry(target.dataItem.get("id"));
      }
      if (target.get("active")) {
        selectCountry(target.dataItem.get("id"));
      }
      previousPolygon = target;
    });

    function selectCountry(id) {
      let dataItem = polygonSeries.getDataItemById(id);
      let target = dataItem.get("mapPolygon");
      console.log(dataItem);
      console.log(dataItem);
      setTimeout(() => {
        if (id === "RU" || id === "CA") {
          chart.zoomToGeoPoint(target.geoCentroid(), 3, target.geoCentroid());
        } else {
          polygonSeries.zoomToDataItem(dataItem);
        }
      }, 1500);
      if (target) {
        let centroid = target.geoCentroid();
        if (centroid) {
          chart.animate({
            key: "rotationX",
            to: -centroid.longitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
          chart.animate({
            key: "rotationY",
            to: -centroid.latitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
        }
      }
    }

    function unSelectCountry(id) {
      let dataItem = polygonSeries.getDataItemById(id);
      let target = dataItem.get("mapPolygon");
      chart.zoomToGeoPoint(target.geoCentroid(), 1, target.geoCentroid());
    }

    function homeCountry(id) {
      let dataItem = polygonSeries.getDataItemById(id);
      let target = dataItem.get("mapPolygon");
      if (target) {
        let centroid = target.geoCentroid();
        if (centroid) {
          chart.animate({
            key: "rotationX",
            to: -centroid.longitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
          chart.animate({
            key: "rotationY",
            to: -centroid.latitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
        }
      }
    }

    // Uncomment this to pre-center the globe on a country when it loads
    polygonSeries.events.on("datavalidated", function () {
      homeCountry("KR");
    });

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      className="chartdiv"
      style={{
        display: "block",
        width: "100%",
        height: "900px",
        backgroundColor: "rgba(0,0,0,0.95)",
      }}></div>
  );
};

export default GlobeMap;
