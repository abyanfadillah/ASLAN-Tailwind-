import react from "react";

import Hero from "../components/Hero";
import Fitur from "../components/Fitur";
import SideNav from "../components/sidenav/SideNav";
import Navbar from "../components/navbar/Navbar";
export default function Landing() {
  return (
    <>
      <SideNav />
      <Navbar />
      <Hero />
      <Fitur />
    </>
  );
}
