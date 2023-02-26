import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/mypage/selectCountryModal.scss";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

function SelectCountryModal({ setSelectedCountryModal }) {
  //[성은 23.02.22] 글쓰기로 넘을때 담을 selectedCountry, nationCode
  const [selectedCountryToPostWrite, setSelectedCountryToPostWrite] =
    useState("South Korea");
  const [nationCodeToPostWrite, setNationCodeToPostWrite] = useState("KR");

  //[성은 23.02.22]GlobeMap에서 쓴 데이터 가져와서 정렬된 국가 이름, 코드 배열 만들기
  const countriesData = am5geodata_worldLow.features
    .map((i) => i.properties)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const selectCountryToWrite = (event) => {
    setSelectedCountryToPostWrite(event.target.value.split("_")[0]);
    setNationCodeToPostWrite(event.target.value.split("_")[1]);
  };

  const closeModal = () => {
    setSelectedCountryModal(false);
  };

  return (
    <div className="selectCountryModalContainer">
      <div className="selectCountryModal">
        <div className="selectBox">
          <label>국가선택</label>
          <select
            onChange={selectCountryToWrite}
            defaultValue={`${selectedCountryToPostWrite}_${nationCodeToPostWrite}`}>
            {countriesData &&
              countriesData.map((i, index) => (
                <option key={index} value={`${i.name}_${i.id}`}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <Link
            to="/postwrite"
            state={{
              selectedCountry: selectedCountryToPostWrite,
              nationCode: nationCodeToPostWrite,
            }}
            className="postButton">
            <span>글쓰기</span>
          </Link>
          <a href="#" onClick={closeModal}>닫기</a>
        </div>
      </div>
    </div>
  );
}

export default SelectCountryModal;
