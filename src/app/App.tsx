import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from '../features/404NotFound/Error404';
import Login from '../features/login/Login';
import Profile from '../features/profile/profile';
import Registration from '../features/registration/registration';
import NewPasswordEntry from '../features/newPasswordEntry/NewPasswordEntry';
import TestPage from '../features/testPage/TestPage';
import PasswordRecovery from '../features/restorePassword/PasswordRecovery';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/newPasswordEntry'} element={<NewPasswordEntry/>}/>
                <Route path={'/passwordRecovery'} element={<PasswordRecovery/>}/>
                <Route path={'/testPage'} element={<TestPage/>}/>

                <Route path="*" element={<Navigate to={'/testPage'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
