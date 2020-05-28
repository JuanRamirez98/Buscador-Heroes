import React from "react";

const Hero = ({ name, img, comic }) => (
  <div>
    <h1>{name}</h1>
    <h2>{img}</h2>
    <h6>{comic}</h6>
  </div>
);

export default Hero;
