import React, { useState, useRef, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "../../styles/map/globeMap.scss";

import Modal from "../common/Modal";

const GlobeMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [test, setTest] = useState(false);

  const openModal = () => {
    console.log("오픈모달 함수 혹시실행되는거니?");
    setModalOpen(true);
    console.log(modalOpen);
  };
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
        zoomStep: 2,
        projection: am5map.geoOrthographic(),
      })
    );

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: "#289145",
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

    // polygonSeries.mapPolygons.template.states.create("hover", {
    //   fill: "skyblue",
    // });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: "blue",
    });

    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    let backgroundSeries = chart.series.unshift(
      am5map.MapPolygonSeries.new(root, {})
    );
    //지도에서 바다색칠하는 부분
    backgroundSeries.mapPolygons.template.setAll({
      fill: "#3b75af",
      stroke: am5.color(0xd4f1f9),
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
      setTimeout(() => {
        if (id === "RU" || id === "CA" || id === "CN" || id === "AQ") {
          chart.zoomToGeoPoint(target.geoCentroid(), 3, target.geoCentroid());
        } else {
          polygonSeries.zoomToDataItem(dataItem);
        }
      }, 1500);
      setTimeout(() => {
        openModal();
        console.log(test);
      }, 2200);
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
  }, [test]);

  return (
    <>
      <div id="chartdiv" className="chartdiv"></div>
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} test={test} setTest={setTest} />
      )}
    </>
  );
};

export default GlobeMap;
