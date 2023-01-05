import React from 'react'
import { Link } from 'react-router-dom';

function EmptyList({ selectedCountry, nationCode }) {
  return (
    <div className="contentBody">
      <div>
        <Link
          to="/postwrite"
          state={{
            selectedCountry: selectedCountry,
            nationCode: nationCode,
          }}
        >
          <span>다이어리 추가</span>
          여기에 이미지 하나 놓으면 좋을거같은데 비행기같은거
          <br/>
          <br/>
          <br/>
          여행 게시물을 추가하세요!라는 이동 버튼 하나 있으면 좋겠스요
        </Link>
      </div>
    </div>
  )
}

export default EmptyList