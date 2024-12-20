import React, { useState, useEffect } from 'react';
import './CalorieTracker.css';

function CalorieTracker() {
  const [foodCalories, setFoodCalories] = useState('');
  const [burnedCalories, setBurnedCalories] = useState('');
  const [caloriesData, setCaloriesData] = useState(null);

  const userId = 101; // Replace with dynamic user ID

  // Function to log calories
  const handleLogCalories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/calories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          date: new Date().toISOString().split('T')[0],
          foodIntakeCalories: parseInt(foodCalories),
          exerciseBurnedCalories: parseInt(burnedCalories),
        }),
      });

      if (response.ok) {
        alert('Calories logged successfully!');
        fetchCaloriesData(); // Refresh data
      } else {
        console.error('Failed to log calories');
      }
    } catch (error) {
      console.error('Error logging calories:', error);
    }
  };

  // Fetch calorie data
  const fetchCaloriesData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/calories/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCaloriesData(data);
      } else {
        console.error('Failed to fetch calories data');
      }
    } catch (error) {
      console.error('Error fetching calories data:', error);
    }
  };

  useEffect(() => {
    fetchCaloriesData();
  }, []);

  return (
    <div className="calorie-tracker-container">
      <h1>Calorie Tracker</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="number"
          placeholder="Calories Consumed"
          value={foodCalories}
          onChange={(e) => setFoodCalories(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories Burned"
          value={burnedCalories}
          onChange={(e) => setBurnedCalories(e.target.value)}
        />
        <button onClick={handleLogCalories} disabled={!foodCalories || !burnedCalories}>
          Log Calories
        </button>
      </div>

      {/* Display Section */}
      {caloriesData && (
        <div className="display-section">
          <h2>Today's Summary</h2>
          <p>Date: {caloriesData.daily.date}</p>
          <p>Calories Consumed: {caloriesData.daily.intake}</p>
          <p>Calories Burned: {caloriesData.daily.burned}</p>
          <p>Net Calories: {caloriesData.daily.net}</p>

          <h2>Weekly Summary</h2>
          <ul>
            {caloriesData.weekly.map((entry, index) => (
              <li key={index}>
                {entry.date} - Consumed: {entry.intake}, Burned: {entry.burned}, Net: {entry.net}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CalorieTracker;
