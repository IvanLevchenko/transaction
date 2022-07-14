import { useEffect, useState } from 'react';
import './App.scss';

import {getTransactions} from './axios/api'

import Filter from './components/Filter/Filter';
import Table from './components/Table/Table'
import Paginator from './components/Paginator/Paginator';

function App() {
  let [rows, setRows] = useState([])
  let [page, setPage] = useState(1)
  let [maxPages, setMaxPages] = useState(5)
  let pageElementsAmount = 14
  let [isPending, setPending] = useState(true)
  let [filter, setFilter] = useState()

  useEffect(() => {
   setPending(true)
   getTransactions(
    {page, 
    pageElementsAmount, 
    option: filter?.option ? filter.option : null, 
    value: filter?.value ? filter.value : null}).then(response => {
      setRows(response.data.result)
      setMaxPages(response.data.maxPages)
      setPending(false)
    })
    console.log(filter)
  }, [page, filter])

  return (
    <div className="App">
      <header className="App__header">
        <h6 className="App__header-title">AppCo</h6>
      </header>
      <main className="table-wrapper">
        <div className="table-wrapper__filter">
          <Filter 
            row={rows[0]}
            onFilter={(payload, option, value) => {
              setRows(payload)
              setFilter({option, value})
            }}
            pageElementsAmount={pageElementsAmount}
            page={page}
          />
        </div>
        <Table 
          rows={rows} 
          rowsAmount={pageElementsAmount} 
          isPending={isPending}
        />
        <Paginator 
          onPageChange={(page) => setPage(page)} 
          maxPageAmount={maxPages}  
        />
      </main>
      <footer className="App__footer">
        <div className="App__footer-inscriptions">
          <p className="App__footer-title">AppCo</p>
          <p className="App__footer-warning">All rights reserved by ThemeTags</p>
          <p className="App__footer-copyright">Copyrights &copy; 2019. </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
