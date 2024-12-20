import React from 'react';
import './AboutTrainers.css';

function AboutTrainers() {
  return (
    <div className="about-trainers-container">
      <h1>Meet Our Trainers and Owners</h1>
      <h2>Trainers</h2>
      <ul>
        <li>
          <strong>John Doe:</strong> Specialized in strength training and conditioning.
        </li>
        <li>
          <strong>Jane Smith:</strong> Expert in cardio and HIIT workouts.
        </li>
      </ul>
      <h2>Owners</h2>
      <p>
        Spark Fitness was founded by passionate fitness enthusiasts who believe in the transformative power of a healthy lifestyle. 
        Our owners are committed to providing a community that inspires and empowers individuals to achieve their fitness aspirations.
      </p>
    </div>
  );
}

export default AboutTrainers;
