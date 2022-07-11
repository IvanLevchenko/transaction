import React from "react";
import './Paginator.scss'

import rightArrow from '../../assets/paginator-arrow.svg'
import leftArrow from '../../assets/paginator-arrow.svg'

export default function Paginator() {
  return (
    <div className="paginator">
      <img src={leftArrow} className="paginator__left-btn" alt="left arrow" />
      <div className="pages">
        <div className="pages__block">1</div>
      </div>
      <img src={rightArrow} className="paginator__right-btn" alt="right arrow" />
    </div>
  )
}