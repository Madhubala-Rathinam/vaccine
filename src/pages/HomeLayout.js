import { Outlet, Link } from "react-router-dom";
import React from 'react';
import '../App.css';
import Navigationbar from "../components/NavigationBar";

const HomeLayout = () => {
    return ( <>
    <Navigationbar/>

        <Outlet/>
        </>
    )
};

export default HomeLayout;