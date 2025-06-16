import React from "react";
import Achiv from "../components/Achiv";
import History from "../components/History";
import { ParallaxProvider } from 'react-scroll-parallax';

const About = () => {

  return (
    <div>
       <ParallaxProvider>
      <History />
      <Achiv />
      </ParallaxProvider>
    </div>
  );
};

export default About;
