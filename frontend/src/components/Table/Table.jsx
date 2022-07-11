import React from 'react'
import './Table.scss'

import TableRow from '../TableRow/TableRow'

export default function Table({rows}) {
  return (
    <table className="table">
      <thead>
        <th>Block number</th>
        <th>Transaction ID</th>
        <th>Sender address</th>
        <th>Recipient's address</th>
        <th>Block confirmations</th>
        <th>Date</th>
        <th>Value</th>
        <th>Transaction Fee</th>
      </thead>
      <tbody>
        {[1,2,2,2,2,2].map(row => {
          return <TableRow />
        })}
      </tbody>
    </table>
  )
}