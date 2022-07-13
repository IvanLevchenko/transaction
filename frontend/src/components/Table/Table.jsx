import React from 'react'
import './Table.scss'

import TableRow from '../TableRow/TableRow'
import Loader from '../Loader/Loader'

export default function Table({rows, page, rowsAmount, isPending}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>Block number</td>
          <td>Transaction ID</td>
          <td>Sender address</td>
          <td>Recipient's address</td>
          <td>Block confirmations</td>
          <td>Date</td>
          <td>Value</td>
          <td>Transaction Fee</td>
        </tr>
      </thead>
      <tbody>
        {isPending
        ? <Loader />
        : rows.slice(rowsAmount * page, rowsAmount).map((row, index)=> {
          return <TableRow key={Math.random()} index={index + 1} row={row} />
        })}
      </tbody>
    </table>
  )
}