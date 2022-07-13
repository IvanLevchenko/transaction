import React from 'react'
import './Loader.scss'

export default function Loader () {
  return (
    <div className="lds-ellipsis loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}