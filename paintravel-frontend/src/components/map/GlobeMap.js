import React, { useState, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import countriesData from "@amcharts/amcharts5-geodata/data/countries";
import "../../styles/map/globeMap.scss";
import ContentList from "../post/ContentList";

console.log(countriesData);
const countryArr = Object.keys(countriesData).map((key) => [key]);
console.log("countryArr : " + countryArr);

const GlobeMap = () => {
  const [globeWidth, setGlobeWidth] = useState("100%");
  const [contentPositionRight, setContentPositionRight] = useState("-60vw");
  const [ContentDisplay, setContentDisplay] = useState("hidden");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [nationCode, setNationCode] = useState("");
  const [starBg, setStarBg] = useState("true");

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
      if (previousPolygon && previousPolygon !== target.dataItem) {
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
      setNationCode(dataItem.dataContext.id);
      setSelectedCountry(dataItem.dataContext.name);
      console.log("국가코드" + dataItem.dataContext.id);
      // setSelectedCountry(target)R;
      setTimeout(() => {
        //타겟의 중심 포인트에
        chart.zoomToGeoPoint(target.geoCentroid(), 1.3, target.geoCentroid());
      }, 1500);
      setGlobeWidth("40%");
      setContentPositionRight("0");
      setContentDisplay("block");
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
      nationDivStyleHandler();
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
    //국가 선택 취소 때 css
    function nationDivStyleHandler() {
      setGlobeWidth("100%");
      setContentPositionRight("-60vw");
      setContentDisplay("hidden");
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

  // // 별 내리는 함수
  // const canvasStar = () =>  {
  //   var canvas = document.getElementById("stars");
  //   var ctx = canvas.getContext("2d");

  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;

  //   var starsLength = getRandomArbitrary(canvas.width / 10, canvas.width / 10);

  //   var starsA = stars("#fff", 0.5);
  //   var starsB = stars("#fff", 0.7);
  //   setStarBg = 0;
  //   // 별 생성
  //   const stars = (color, radius) =>  {
  //     var starsArr = [];

  //     for (var i = 0; i < starsLength; i++) {
  //       ctx.beginPath();
  //       var x = getRandomArbitrary(0, canvas.width);
  //       var y = getRandomArbitrary(0, canvas.height);
  //       ctx.arc(x, y, radius, 0, 2 * Math.PI);
  //       ctx.fillStyle = color;
  //       ctx.fill();
  //       starsArr.push({ x, y, radius, color });
  //     }
  //     return starsArr;
  //   }
  //   // 별 떨어지는 동작
  //   const update = (starsArr) => {
  //     for (var i = 0; i < starsArr.length; i++) {
  //       ctx.beginPath();
  //       starsArr[i].x += starsArr[i].radius * 0.1;
  //       starsArr[i].y += starsArr[i].radius * 0.1;
  //       ctx.arc(
  //         starsArr[i].x,
  //         starsArr[i].y,
  //         starsArr[i].radius,
  //         0.3,
  //         2 * Math.PI
  //       );
  //       ctx.fillStyle = starsArr[i].color;
  //       ctx.fill();

  //       if (starsArr[i].x > canvas.width) {
  //         starsArr[i].x = 0;
  //       }
  //       if (starsArr[i].y > canvas.height) {
  //         starsArr[i].y = 0;
  //       }
  //     }
  //   }

  //   // 별 떨어지는 동작 실행
  //   const render = () => {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     update(starsA);
  //     update(starsB);
  //     requestAnimationFrame(render);
  //   }
  //   requestAnimationFrame(render);

  //   // 난수
  //   const getRandomArbitrary = (min, max) => {
  //     return Math.random() * (max - min) + min;
  //   }
  // }
  return (
    <div className="globeMap">
      <div
        style={{ width: `${globeWidth}` }}
        id="chartdiv"
        className="chartdiv"
      >
        {/* <canvas id="stars" onLoad={canvasStar}></canvas> */}
      </div>
      <div
        className="nationdiv"
        style={{
          right: `${contentPositionRight}`,
          display: `${ContentDisplay}`,
          position: "absolute",
          width: "60vw",
        }}
      >
        <ContentList
          selectedCountry={selectedCountry}
          nationCode={nationCode}
        />
      </div>
    </div>
  );
};

export default GlobeMap;
