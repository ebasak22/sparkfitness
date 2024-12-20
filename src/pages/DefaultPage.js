import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './DefaultPage.css';

function DefaultPage() {
  const [allExercises, setAllExercises] = useState([]); // List of all exercises
  const [selectedExercises, setSelectedExercises] = useState([]); // Selected exercises
  const [userId, setUserId] = useState(''); // User ID to assign exercises

  useEffect(() => {
    // Fetch all possible exercises
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/exercises');
        if (response.ok) {
          const data = await response.json();
          setAllExercises(data);
        } else {
          console.error('Failed to fetch exercises');
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleExerciseToggle = (exerciseId) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const handleAssignExercises = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/assign-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, selectedExercises }),
      });
      if (response.ok) {
        alert('Exercises assigned successfully!');
        setSelectedExercises([]); // Clear selection
      } else {
        console.error('Failed to assign exercises');
      }
    } catch (error) {
      console.error('Error assigning exercises:', error);
    }
  };

  return (
    <div className="default-page-container">
      {/* Header Section with Login/SignUp Button */}
      <header className="default-header">
        <h1>Welcome to Spark Fitness</h1>
        <Link to="/login" className="login-signup-btn">
          Login/SignUp
        </Link>
      </header>

      {/* General Gym Exercise Chart */}
      <div className="gym-info">
        <h2>General Gym Exercise Chart</h2>
        <table>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Description</th>
              <th>Reps/Sets</th>
            </tr>
          </thead>
          <tbody>
            {allExercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.name}</td>
                <td>{exercise.description}</td>
                <td>{exercise.sets || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Exercises Section */}
      <div className="default-page">
        <h1>All Possible Exercises</h1>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <ul>
          {allExercises.map((exercise) => (
            <li key={exercise.id}>
              <input
                type="checkbox"
                checked={selectedExercises.includes(exercise.id)}
                onChange={() => handleExerciseToggle(exercise.id)}
              />
              <strong>{exercise.name}:</strong> {exercise.description} ({exercise.sets || 'N/A'})
            </li>
          ))}
        </ul>
        <button
          onClick={handleAssignExercises}
          disabled={!userId || selectedExercises.length === 0}
        >
          Assign Selected Exercises
        </button>
      </div>

      {/* Common Gym Videos */}
      <div className="gym-videos">
        <h3>Common Gym Videos</h3>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Gym Video"
          allowFullScreen
        ></iframe>
        <p>Watch more on our YouTube channel!</p>
      </div>
    </div>
  );
}

export default DefaultPage;
