import React from 'react'
import './App.css'
import ConfigurableTable from './components/ConfigurableTable';

function App() {
  const sampleData = [
    {id: 1, name: "john", age: 25, role: "developer"},
    {id: 2, name: "jane", age: 30, role: "designer"},
  ]
  return (
    <>
      <ConfigurableTable/>
      <h1>hello</h1>
    </>
  );
}

export default App
