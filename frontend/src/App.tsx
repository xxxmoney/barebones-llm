import {useEffect,} from 'react';
import './App.css';
import {TestApi} from './api/test.api.ts';

function App() {
  async function getSampleData() {
    const response = await TestApi.getSampleData();
    console.log(response.data);
  }
  
  useEffect(() => {
    console.log('Loaded');

    return () => {
      console.log('Unloaded');
    };
  });

  return (
    <>
      <header></header>
        
      <main>
        <h1>Self Learning App</h1>

        <button onClick={() => getSampleData()}>GET DATA</button>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
