import React, { useEffect, useState } from 'react';
import CalorieTracker from '../components/CalorieTracker';
import './Dashboard.css';

function Dashboard() {
  const [personalizedExercises, setPersonalizedExercises] = useState([]); // State for personalized exercises
  const [attendanceMessage, setAttendanceMessage] = useState(''); // State for attendance feedback
  const [isLoadingExercises, setIsLoadingExercises] = useState(true); // Loading state for exercises
  const [isLoading, setIsLoading] = useState(false); // Loading state for attendance
  const [completedExercises, setCompletedExercises] = useState([]); // State for completed exercises

  // Toggle exercise completion
  const toggleExerciseCompletion = (exerciseId) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  // Fetch personalized exercises
  useEffect(() => {
    const fetchPersonalizedData = async () => {
      try {
        const response = await fetch('http://localhost:3000/personalized-exercises');
        if (response.ok) {
          const data = await response.json();
          setPersonalizedExercises(data);
          setIsLoadingExercises(false);
        } else {
          console.error('Failed to fetch personalized exercises');
          setIsLoadingExercises(false);
        }
      } catch (error) {
        console.error('Error fetching personalized data:', error);
        setIsLoadingExercises(false);
      }
    };

    fetchPersonalizedData();
  }, []);

  // Mark attendance
  const markAttendance = async () => {
    const token = localStorage.getItem('token');
    setIsLoading(true);
    setAttendanceMessage('');
    try {
      const response = await fetch('http://localhost:3000/attendance', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceMessage(data.message || 'Attendance marked successfully!');
      } else {
        const errorData = await response.json();
        setAttendanceMessage(errorData.error || 'Failed to mark attendance.');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      setAttendanceMessage('An error occurred while marking attendance.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Personalized Dashboard</h1>

      {/* Attendance Section */}
      <div className="attendance-section">
        <h2>Attendance</h2>
        <button
          onClick={markAttendance}
          className="attendance-button"
          disabled={isLoading}
        >
          {isLoading ? 'Marking...' : 'Mark Attendance'}
        </button>
        {attendanceMessage && (
          <p
            className={`attendance-message ${
              attendanceMessage.includes('success') ? 'success' : 'error'
            }`}
          >
            {attendanceMessage}
          </p>
        )}
      </div>

      {/* Personalized Exercise Chart */}
      <div className="exercise-list">
        <h2>Your Personalized Exercise Chart</h2>
        {isLoadingExercises ? (
          <p>Loading your exercises...</p>
        ) : personalizedExercises.length > 0 ? (
          <ul>
            {personalizedExercises.map((exercise) => (
              <li
                key={exercise.id}
                className={`exercise-item ${
                  completedExercises.includes(exercise.id) ? 'completed' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={completedExercises.includes(exercise.id)}
                  onChange={() => toggleExerciseCompletion(exercise.id)}
                />
                <strong>{exercise.name}:</strong> {exercise.description} ({exercise.sets || 'N/A'})
              </li>
            ))}
          </ul>
        ) : (
          <p>No exercises assigned yet.</p>
        )}
      </div>

      {/* Calorie Tracker */}
      <div className="calorie-tracker-section">
        <CalorieTracker />
      </div>
    </div>
  );
}

export default Dashboard;
