import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const corsPort = '8000'

function App() {
  const makeAPICall = async () => {
    try {
      const response = await fetch(`http://localhost:${corsPort}/cors`, { mode:'cors' });
      console.log(await response.text())
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    makeAPICall();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
