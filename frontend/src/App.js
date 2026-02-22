import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Plateforme E-commerce Distribuée</h1>
        <p>Projet Système Réparti - DevOps</p>
      </header>
      <main className="App-main">
        <ProductList />
      </main>
    </div>
  );
}

export default App;