import React, {useEffect, useState} from 'react'
import './Filter.scss'

import {filterTransactions} from '../../axios/api'
import {validate} from '../../validate'

import search from '../../assets/search.svg'

export default function Filter({row, onFilter, page, pageElementsAmount}) {
  let [options, setOptions] = useState([])
  let excludedOptions = ["_id", "blockConfirmations", "date", "value", "transactionFee", "__v"]
  let [optionValues, setOptionValues] = useState({})
  let [selected, setSelected] = useState(['Block number'])
  let [filterValue, setFilterValue] = useState()


  const valueToText = (string) => {
    if (string.includes('ID')) {
      let indx = string.indexOf('ID')
      return string[0].toUpperCase() + string.slice(1, indx) + ' ID'
    }
    const replaced = string.replace(/([A-Z])/g, " $1");
    const result = (replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase()).trim()

    return result
  }

  const handleOptions = () => {
    let keys = Object.keys(row ? row : {})
    keys = keys.map((key) => {
      if(!excludedOptions.includes(key)) {
        optionValues[valueToText(key)] = key
        return valueToText(key)
      } else {
        return undefined
      }
    })
    keys = keys.filter(key => !!key)

    setOptionValues(optionValues)
    setOptions(keys)
  }

  const filter = () => {
    if(validate(optionValues[selected[0]], filterValue)) {
      filterTransactions({option: optionValues[selected[0]], page, pageElementsAmount, value: filterValue}).then(response => {
        onFilter(response.data, optionValues[selected[0]], filterValue)
      })
    }
  }

  useEffect(() => {
    handleOptions()
  }, [row])

  return (
    <div className="filter">
      <div className="filter__search">
        <input 
          type="text" 
          className="filter__search-input" 
          placeholder="Search..." 
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <select className="filter__search-select" onChange={(e) => setSelected([e.target.value])}>
          {
          Object.keys(optionValues).map((option) => {
            return <option key={Math.random()} selected={selected == option}>{option}</option>
          })
          }
        </select>
      </div>
      <button className="filter__search-btn" onClick={filter} >
        <img src={search} alt="search"/>
      </button>
    </div>
  )
}