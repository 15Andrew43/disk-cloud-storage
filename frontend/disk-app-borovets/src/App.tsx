import React, {useEffect} from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom';

import './App.css';
import Header from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftBar from "./components/LeftBar/LeftBar";
import Body from "./pages/Body/Body";
import Authorization, {handleLogin} from "./pages/Authorization";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuth} from "./redux/store"; // Импортируйте компонент авторизации

function App() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect( () => {
        handleLogin(dispatch, navigate);
    }, [])


  return (

      <div className={`background-style`}>
            <div className={`header-style`}><Header /></div>
            <div className={`leftbar_body-style`}>
              <div className={`leftbar-style`}>
                <LeftBar/>
              </div>
              <div className={`body-style`}>
                  <Routes>
                      <Route path="/fs" element={<Body/>} />
                      {/*<Route path="/common" component={CommonComponent} />*/}
                      {/*<Route path="/media" component={MediaComponent} />*/}
                      {/*<Route path="/trash" component={TrashComponent} />*/}
                      {/*<Redirect to="/fs" />*/}
                      <Route path="/auth" element={<Authorization/>} />
                  </Routes>
              </div>
            </div>
      </div>

  );
}

export default App;
