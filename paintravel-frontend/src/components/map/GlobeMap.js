import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "../../styles/map/globeMap.scss";
import ContentList from "../post/ContentList";
import axios from "axios";
import Loading from "../common/Loading";
import { BiArrowBack } from "react-icons/bi";

const GlobeMap = () => {
  const [globeWidth, setGlobeWidth] = useState("100%");
  const [contentPositionRight, setContentPositionRight] = useState("-60vw");
  const [ContentDisplay, setContentDisplay] = useState("hidden");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [nationCode, setNationCode] = useState("");
  const [visitedCountry, setVisitedCountry] = useState([]);
  const [needToFill, setNeedToFill] = useState(true);
  const [login_id, setLogin_id] = useState("*");
  const [loading, setLoading] = useState(false);
  //LoginedList에서 쓰일 데이터
  const [listData, setListData] = useState();

  //selectedCountry될 때 실행되는 contentList CSS바꿔서 나타나게 하는함수
  const contentListOpen = () => {
    setGlobeWidth("40%");
    setContentPositionRight("0");
    setContentDisplay("block");
  };
  //contetnList 닫는 함수
  const contentListClose = () => {
    setGlobeWidth("100%");
    setContentPositionRight("-60vw");
    setContentDisplay("hidden");
  };

  const existsessionStorage = sessionStorage.getItem("LOGINEDID");

  /* Chart code */
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  //로컬스토리지에 LOGINEDID가 있을 경우 실행
  useEffect(() => {
    if (existsessionStorage) {
      setLogin_id(JSON.parse(sessionStorage.getItem("LOGINEDID")).value);
    }
    //[현아, 성은] 기방문 국가 탐색을 위한 부분
    if (needToFill) {
      if (login_id !== "*") {
        setLoading(true);
        const postData = {
          currentId: login_id,
        };
        axios
          .post("/api/post/getVisitedList", postData)
          .then(function (res) {
            setVisitedCountry(res.data.countryList);
            setNeedToFill(false);
            setLoading(false);
          })
          .catch((err) => console.log("에러발생" + err));
      }
    }
  });

  useLayoutEffect(() => {
    if (!loading) {
      let root = am5.Root.new("chartdiv");

      // Set themes+
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
          zoomStep: 4,
          projection: am5map.geoOrthographic(),
        })
      );

      // Create main polygon series for countries
      // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
      // 폴리곤 시리즈 생성, goe데이터 및 기본 국가 설정
      let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"],
          // fill: "#809cb0b7",
          fill: "rgba(239,248,255,0.5)",
          strokeWidth: "3px",
        })
      );
      // 폴리곤 시리즈 세팅
      polygonSeries.mapPolygons.template.setAll({
        //tooltipText: "{name}",
        tooltipText: "{name} : {value}",
        templateField: "polygonSettings",
        toggleKey: "active",
        interactive: true,
      });

      polygonSeries.mapPolygons.template.states.create("hover", {
        cursorOverStyle: "pointer",
      });

      if (visitedCountry !== []) {
        // [현아/성은] ----> 방문한 국가의 색깔을 지정하기 위한 과정
        // 기존에 방문한 국가 배열로 백엔드에서 받아오기

        //나라 개수 만큼 반복문 형식
        polygonSeries.mapPolygons.template.adapters.add(
          "fill",
          function (fill, target) {
            let dataContext = target.dataItem.dataContext;
            let visitCount = visitedCountry.reduce(
              (cnt, element) => cnt + (dataContext.id === element),
              0
            );
            let fillColor;
            let selectedColor;
            switch (visitCount) {
              case 0: //0번 방문한 국가의 경우 색을 지정하지 않음
                break;
              case 1: //1번 방문한 국가 색 지정
                fillColor = "rgba(0,255,100,0.2)";
                break;
              case 2: //2-3번 방문한 국가 색 지정
              case 3:
                fillColor = "rgba(0,255,100,0.4)";
                break;
              case 4: //4-5번 방문한 국가 색 지정
              case 5:
                fillColor = "rgba(0,255,100,0.6)";
                break;
              case 6: //6-9번 방문한 국가 색 지정
              case 7:
              case 8:
              case 9:
                fillColor = "rgba(0,255,100,0.8)";
                break;
              default:
                if (visitCount > 9) {
                  //10번 이상 방문한 국가 색 지정
                  fillColor = "rgba(0,255,100,1)";
                }
                break;
            }

            if (visitedCountry.includes(dataContext.id)) {
              dataContext.colorWasSet = true;
              target.setRaw("fill", fillColor);
              return fillColor;
            } else {
              return fill;
            }
          }
        );
      }

      // Create series for background fill
      // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
      let backgroundSeries = chart.series.unshift(
        am5map.MapPolygonSeries.new(root, {})
      );

      //지도에서 바다색칠하는 부분
      backgroundSeries.mapPolygons.template.setAll({
        // fill: "#1633569c",
        fill: "rgba(17,54,100,0.5)",
        stroke: "transparent",
      });
      backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180),
      });

      // Set up events
      let previousPolygon;

      //toggel event 에서 active 변수를 이용해 클릭시 색상 변경
      polygonSeries.mapPolygons.template.states.create("active", {
        fill: "#2323db58",
      });

      //toggel event 에서 active 변수를 이용해 클릭/재클릭시 실행할 함수 적용
      polygonSeries.mapPolygons.template.on(
        "active",
        function (active, target) {
          if (previousPolygon && previousPolygon !== target.dataItem) {
            previousPolygon.set("active", false);
            unSelectCountry(target.dataItem.get("id"));
          }
          if (target.get("active")) {
            selectCountry(target.dataItem.get("id"));
          }
          previousPolygon = target;
          console.log(previousPolygon);
        }
      );
      function selectCountry(id) {
        let dataItem = polygonSeries.getDataItemById(id);
        let target = dataItem.get("mapPolygon");
        setNationCode(dataItem.dataContext.id);
        setSelectedCountry(dataItem.dataContext.name);

        //로그인 아이디가 "*"(기본값)이 아닐 때 -> 로그인된 아이디가 있을 때
        // postData에 데이터를 담고 axios로 getPostList에 로그인 된 아이디, 클릭된 국가 코드보내기
        if (login_id !== "*") {
          const postData = {
            currentId: login_id,
            selectCountry: dataItem.dataContext.id,
          };
          axios
            .post("/api/post/getPostList", postData)
            .then(function (res) {
              setListData(res.data.postList);
            })
            .catch((err) => console.log("에러발생" + err));
        }

        setTimeout(() => {
          //타겟의 중심 포인트에
          chart.zoomToGeoPoint(target.geoCentroid(), 2, target.geoCentroid());
        }, 1500);
        contentListOpen();
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
        contentListClose();
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
    }
  }, [visitedCountry]);

  // 별 내리는 함수
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [canvasStar, setCanvasStar] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starsLength = getRandomArbitrary(
      canvas.width / 10,
      canvas.width / 10
    );

    const starsA = stars("#fff", 0.5);
    const starsB = stars("#fff", 0.7);
    // 별 생성
    function stars(color, radius) {
      const starsArr = [];

      for (var i = 0; i < starsLength; i++) {
        ctx.beginPath();
        var x = getRandomArbitrary(0, canvas.width);
        var y = getRandomArbitrary(0, canvas.height);
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        starsArr.push({ x, y, radius, color });
      }
      return starsArr;
    }
    // 별 떨어지는 동작
    function update(starsArr) {
      for (var i = 0; i < starsArr.length; i++) {
        ctx.beginPath();
        starsArr[i].x += starsArr[i].radius * 0.1;
        starsArr[i].y += starsArr[i].radius * 0.1;
        ctx.arc(
          starsArr[i].x,
          starsArr[i].y,
          starsArr[i].radius,
          0.3,
          2 * Math.PI
        );
        ctx.fillStyle = starsArr[i].color;
        ctx.fill();

        if (starsArr[i].x > canvas.width) {
          starsArr[i].x = 0;
        }
        if (starsArr[i].y > canvas.height) {
          starsArr[i].y = 0;
        }
      }
    }

    // 별 떨어지는 동작 실행
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      update(starsA);
      update(starsB);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // 난수
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    setCanvasStar(contextRef.current);
  }, []);

  const goMain = () => {
    navigate("/");
  };

  return (
    <div className="globeMap">
      <div
        style={{ width: `${globeWidth}` }}
        id="chartdiv"
        className="chartdiv"></div>
      <canvas className="stars" ref={canvasRef}></canvas>

      {loading ? (
        <Loading />
      ) : (
        <div
          className="nationdiv"
          style={{
            right: `${contentPositionRight}`,
            display: `${ContentDisplay}`,
            position: "absolute",
            width: "60vw",
          }}>
          <ContentList
            selectedCountry={selectedCountry}
            nationCode={nationCode}
            contentListClose={contentListClose}
            listData={listData}
          />
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
