import React from "react";
import DataLogistik from "../components/DataLogistik";
import Navbar from "../components/navbar/Navbar";
import SideNav from "../components/sidenav/SideNav";

export default function Logistik () {
    return(
        <>
        <SideNav/>
        <Navbar/>
        <DataLogistik/>
        </>
    )
}