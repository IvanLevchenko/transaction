import React from 'react'
import './TableRow.scss'

export default function TableRow({row}) {
  return (
    <tr>
      <td>{row.blockNumber}</td>
      <td 
        onClick={() => window.open(`https://etherscan.io/tx/${row.transactionID}`, '_black')}
      >{<ins>{row.transactionID?.substr(0, 12) + '...'}</ins>}</td>
      <td>{row.senderAddress?.substr(0, 13) + '...'}</td>
      <td>{row.recipentsAddress?.substr(0, 15) + '...'}</td>
      <td>{parseInt(row.blockConfirmations)}</td>
      <td>{`${`${new Date(row.date)}`.split(' ')[1]}-${new Date(row.date).getDate()}-${new Date(row.date).getFullYear()}`}</td>
      <td>{row.value}</td>
      <td>{row.transactionFee}</td>
    </tr>
  )
}