export const validate = (option, value) => {
  console.log(option, value)
  if (option == 'blockNumber') {
    if(`${value}`.match(/[0-9]/)) return true
    else return false
  } else if (option == 'transactionID' || option == 'senderAddress' || option == 'recipentsAddress') {
    if(`${value}`.match(/$0x[A-Z]|[0-9]+/)) return true
    else return false
  }
}