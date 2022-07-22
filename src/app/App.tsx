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

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/set-new-password'} element={<SetNewPassword/>}/>
                <Route path={'/passwordRecovery'} element={<PasswordRecovery/>}/>
                <Route path={'/testPage'} element={<TestPage/>}/>

                <Route path="*" element={<Navigate to={'/testPage'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
