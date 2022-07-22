import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from '../features/404NotFound/Error404';
import Registration from '../features/registration/registration';
import Login from '../features/login/Login';
import PasswordRecovery from '../features/restorePassword/PasswordRecovery';
import SetNewPassword from '../features/SetNewPassword/SetNewPassword';
import TestPage from '../features/testPage/TestPage';
import Profile from '../features/profile/Profile';
import {RoutesPath} from '../enums/routes-path';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={RoutesPath.error404} element={<Error404/>}/>
                <Route path={RoutesPath.login} element={<Login/>}/>
                <Route path={RoutesPath.profile} element={<Profile/>}/>
                <Route path={RoutesPath.registration} element={<Registration/>}/>
                <Route path={RoutesPath.setNewPassword} element={<SetNewPassword/>}/>
                <Route path={RoutesPath.passwordRecovery} element={<PasswordRecovery/>}/>
                <Route path={RoutesPath.testPage} element={<TestPage/>}/>

                <Route path="*" element={<Navigate to={'/testPage'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
