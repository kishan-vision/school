import { Fragment, useEffect, useState } from 'react';
import './App.scss';
import { Navigate, Route, Routes, } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import { StateContext } from './components/context/stateContext';
import { routes } from './components/routes/routes';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loginData, setLoginData] = useState(JSON.parse(localStorage.getItem('loginData')) ?? [])
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem('roles')) ?? [{
    roleId: "1",
    roleName: "Admin"
  }]);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) ?? [
    {
      id: Date.now(),
      firstName: "John",
      lastName: "Deo",
      gender: "Male",
      email: "john@gmail.com",
      phone: 1234656789,
      password: "1234",
      roleId: 1,
      userName: "john123",
      city: "new york",
      landMark: "Oakview Mall",
      address: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
    }
  ])

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    auth ? setIsAuth(true) : setIsAuth(false);
  }, [])

  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
  }, [roles])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users])

  useEffect(() => {
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }, [loginData])

  useEffect(() => {
    localStorage.setItem("auth", isAuth);
  }, [isAuth])

  return (
    <Fragment>
      <StateContext.Provider value={{ setIsAuth: setIsAuth, setLoginData: setLoginData, setUsers: setUsers, loginData: loginData, roles: roles, setRoles: setRoles, isAuth: isAuth, users: users }}>
        <Routes>
          {
            isAuth &&
            <Route element={<Layout routes={routes} setIsAuth={setIsAuth} />}>
              {
                routes?.map((item, i) => (
                  <Route key={i} path={item.path} element={item.element} />
                ))
              }
            </Route>
          }
          {!isAuth && <Route path='/' element={<Login setIsAuth={setIsAuth} />} />}
          <Route path='*' element={<Navigate to={isAuth ? "/users" : "/"} />} />
          {/* <Route path='*' element={<NotFoundPage />} /> */}
        </Routes>
      </StateContext.Provider>
    </Fragment>
  );
}

export default App;


