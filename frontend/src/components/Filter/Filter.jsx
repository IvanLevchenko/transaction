import React from 'react'
import './Filter.scss'

import search from '../../assets/search.svg'

export default function Filter() {
  return (
    <div className="filter">
      <div className="filter__search">
        <input type="text" className="filter__search-input" placeholder="Search..." />
        <select className="filter__search-select"></select>
      </div>
      <button className="filter__search-btn">
        <img src={search} alt="search" />
      </button>
    </div>
  )
}