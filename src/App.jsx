import React from "react"

import './App.css';
import Nav from "./components/Nav";
import Header from "./components/Header";
import Main from "./components/Main";
import FeedingMain from "./components/FeedingMain";
// import FeedingMain from "./components/FeedingMain"
// import DiapersMain from "./components/DiapersMain"

function App() {
  return (
    <div className="App">
    <Header />
    <div className= "Grid">
      
      
      <Main />
      <FeedingMain />
      {/* <DiapersMain />
      <FeedingMain /> */}
    </div>
      <Nav />
    </div>
  );
}

export default App;
