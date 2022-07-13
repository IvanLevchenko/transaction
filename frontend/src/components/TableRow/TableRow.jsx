import React from 'react'
import './TableRow.scss'

export default function TableRow(data) {
  
  return (
    <tr>
      <td>{parseInt(data.row.blockNumber)}</td>
      <td 
        onClick={() => window.open(`https://etherscan.io/tx/${data.row.transactionID}`, '_black')}
      >{<ins>{data.row.transactionID?.substr(0, 12) + '...'}</ins>}</td>
      <td>{data.row.senderAddress?.substr(0, 13) + '...'}</td>
      <td>{data.row.RecipentsAddress?.substr(0, 15) + '...'}</td>
      <td>{parseInt(data.row.blockConfirmations)}</td>
      <td>{`${`${new Date(data.row.date + 1)}`.split(' ')[1]}-${new Date(data.row.date).getDate()}-${new Date(data.row.date).getFullYear()}`}</td>
      <td>{'0.' + parseInt(data.row.value)}</td>
      <td>{'0.' + parseInt(data.row.transactionFee)}</td>
    </tr>
  )
}