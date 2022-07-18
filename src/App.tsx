import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404 from './components/404/404';
import Login from './components/login/login';
import Profile from './components/profile/profile';
import Registration from './components/registration/registration';
import RestorePassword from './components/restorePassword/restorePassword';
import SetNewPassword from './components/setNewPassword/setNewPassword';
import Test from './components/test';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/test" element={<Test/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="restorePassword" element={<RestorePassword/>}/>
                <Route path="set-new-password" element={<SetNewPassword/>}/>

                <Route
                    path="/404"
                    element={<Error404/>}
                />
                <Route path="*" element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
