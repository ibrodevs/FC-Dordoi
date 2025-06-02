import React from "react";
import Abot from "../components/Abot";
import Achiv from "../components/Achiv";
import History from "../components/History";
import { ParallaxProvider } from 'react-scroll-parallax';

const About = () => {

  return (
    <div>
       <ParallaxProvider>
      <Abot />
      <History />
      <Achiv />
      </ParallaxProvider>
    </div>
  );
};

export default About;
