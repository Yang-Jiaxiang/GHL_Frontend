import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateReport from '../Pages/CreateReport/CreateReport'
import Home from '../Pages/Home/Home'
import Patient from '../Pages/Patient/Patient'
import Department from '../Pages/Department/Department'
import Report from '../Pages/Report/Report'
import User from '../Pages/User/User'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createReport" element={<CreateReport />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/department" element={<Department />} />
            <Route path="/report" element={<Report />} />
            <Route path="/user" element={<User />} />
        </Routes>
    )
}

export default Router
