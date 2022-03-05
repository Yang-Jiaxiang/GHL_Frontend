import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from './Slices/Patient';
import sidebarReducer from './Slices/Sidebar';
import dashboardReducer from './Slices/Dashboard';
import scheduleReducer from './Slices/Schedule';

export default configureStore({
    reducer: {
        patients: patientsReducer,
        schedule: scheduleReducer,
        sidebar: sidebarReducer,
        dashboard: dashboardReducer,
    },
});
