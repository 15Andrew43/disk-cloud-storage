import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom';

import './App.css';
import Header from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftBar from "./components/LeftBar/LeftBar";
import Body from "./components/Body/Body";
import Authorization from "./sites/Authorization"; // Импортируйте компонент авторизации

function App() {
  // Проверяем наличие токена в локальном хранилище
  var isAuthenticated = false;
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
        isAuthenticated = true;
    }

  console.log(isAuthenticated, localStorage.getItem('token'));


      // const navigate = useNavigate();

  // Если не аутентифицирован, перенаправляем на страницу авторизации
  // if (!isAuthenticated) {
  //   navigate('/auth');
  // }


  return (
    <Router>
      <div className={`background-style`}>
          {isAuthenticated
              ?
              <>
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
                      {/*<Route path="/auth" element={<Authorization/>} />*/}
                    {/*{isAuthenticated ? null : <Navigate to="/auth" />} /!* Перенаправляем на страницу авторизации *!/*/}
                  </Routes>
              </div>
            </div>
          </>
              :
              <Authorization/>
          }

      </div>
    </Router>
  );
}

export default App;
