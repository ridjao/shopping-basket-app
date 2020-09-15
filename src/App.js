import React from 'react';
import './App.css';
import BasketList from './components/BasketList';
import Customer from './components/Customer';
import BasketEntry from './components/BasketEntry';

function App() {
  return (
    <div className="App">
      <Customer/>
      <BasketList/>
      <BasketEntry/>
    </div>
  );
}

export default App;
