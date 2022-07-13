import { useEffect, useState } from 'react';
import './App.scss';

import {getTransactions} from './axios/api'

import Filter from './components/Filter/Filter';
import Table from './components/Table/Table'
import Paginator from './components/Paginator/Paginator';

function App() {
  let [rows, setRows] = useState([])
  let [page, setPage] = useState(1)
  let [maxPages, setMaxPages] = useState(0)
  let pageElementsAmount = 14
  let [isPending, setPending] = useState(true)

  useEffect(() => {
   setPending(true)
   getTransactions({page, pageElementsAmount}).then(response => {
      setRows(response.data.result)
      setMaxPages(response.data.maxPages)
      setPending(false)
    })
  }, [page])

  return (
    <div className="App">
      <header className="App__header">
        <h6 className="App__header-title">AppCo</h6>
      </header>
      <main className="table-wrapper">
        <div className="table-wrapper__filter">
          <Filter row={rows[0]}/>
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
