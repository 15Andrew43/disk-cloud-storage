import React, {useEffect} from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom';

import './App.css';
import Header from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftBar from "./components/LeftBar/LeftBar";
import Body from "./pages/Body/Body";
import Authorization from "./pages/Authorization";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuth} from "./redux/store"; // Импортируйте компонент авторизации


function App() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect( () => {
        let token = localStorage.getItem('token');
        if (!!token && token !== 'undefined') {
          dispatch(setIsAuth(true));
          navigate('/fs');
        } else {
            dispatch(setIsAuth(false));
            navigate('/auth');
        }
    }, [])

  const isAuth = useSelector<any>((state) => {
      console.log("App!");
          console.log(state);
          console.log();
          return state.app.is_auth;
      });


      // const navigate = useNavigate();

  // Если не аутентифицирован, перенаправляем на страницу авторизации
  // if (!isAuthenticated) {
  //   navigate('/auth');
  // }


  return (

      <div className={`background-style`}>
          {/*{isAuth*/}
          {/*    ?*/}
          {/*    <>*/}
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
                    {/*{isAuthenticated ? null : <Navigate to="/auth" />} /!* Перенаправляем на страницу авторизации *!/*/}
                  </Routes>
              </div>
            </div>
          {/*</>*/}
          {/*    :*/}
          {/*    <Authorization/>*/}
          {/*}*/}

      </div>

  );
}

export default App;
