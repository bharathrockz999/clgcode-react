import React from 'react';
import './About.css'; 
import abtimg from './northwest-image3.jpg';
import d1 from './Shivani_Image.jpg'
import d2 from './Ashok_Murali_Image.jpg'
import d3 from './Murali_Krishna_Image.jpg'
import d4 from './Nithin.jpg'
import d5 from './Nikhil_Image.jpg'
import d6 from './Lakshmi mage.png'
const About = () => {
  return (
    <div className="about-container">
      <img
        src={abtimg}
        alt="Large"
        className="large-image"
      />
      <p className="about-text">
      Northwest professional based learning (PBL) is one of the CIET project, and which is a platform for project to explore projects.
    Northwest’s Faculties, students, any authorized users can post and discuss their potential PBL projects on this platform and 
    unauthorized users can only view the public projects available on the platform. The authorized users receive requests for the 
    projects which he/she has posted and can contact them through email or internal message system. After interviewing them, they 
    can decide on the team to work on their project.
      </p>
      <h2 className="developers-heading">Developers</h2>
<div className="developers">
  <div className="developer">
    <img
      src={d1} 
      alt="Developer 1"
      className="developer-image"
    />
    <p>Developer 1</p>
  </div>
  <div className="developer">
    <img
      src={d2} 
      alt="Developer 2"
      className="developer-image"
    />
    <p>Developer 2</p>
  </div>
  <div className="developer">
    <img
      src={d3}
      alt="Developer 3"
      className="developer-image"
    />
    <p>Developer 3</p>
  </div>
  <div className="developer">
    <img
      src={d4}
      alt="Developer 3"
      className="developer-image"
    />
    <p>Developer 4</p>
  </div>
  <div className="developer">
    <img
      src={d5}
      alt="Developer 3"
      className="developer-image"
    />
    <p>Developer 5</p>
  </div>
  <div className="developer">
    <img
      src={d6}
      alt="Developer 3"
      className="developer-image"
    />
    <p>Developer 6</p>
  </div>
</div>

    </div>
  );
};

export default About;
