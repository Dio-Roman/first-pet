import React from 'react';
import './App.css';
import Desktop from './components/Desktop/Desktop';
import Header from './components/Header/Header';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';


function App() {
  return (
    <div className="App">
      {/* <WelcomeScreen/> */}
      <Header/>
      <Desktop/>

    </div>
  );
}

export default App;
