import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftBar from "./components/LeftBar/LeftBar";
import Body from "./components/Body/Body";

// import style from './App.css';

function App() {
  return (
      <div className={`background-style`}>
          <div className={`header-style`}><Header /></div>

        <div className={`leftbar_body-style`}>
          <div className={`leftbar-style`}>
              <LeftBar/>
          </div>
          <div className={`body-style`}>
              <Body/>
          </div>
        </div>
      </div>
  );
}

export default App;
