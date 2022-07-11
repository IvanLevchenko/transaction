import './App.scss';

import Filter from './components/Filter/Filter';
import Table from './components/Table/Table'
import Paginator from './components/Paginator/Paginator';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h6 className="App__header-title">AppCo</h6>
      </header>
      <main className="table-wrapper">
        <div className="table-wrapper__filter">
          <Filter />
        </div>
        <Table />
        <Paginator />
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
