import React, { useEffect, useState } from 'react';
import './NotificationPage.css';

function NotificationPage() {
  const [notifications, setNotifications] = useState([]); // Notifications state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token); // Debugging log to check the token

      if (!token) {
        console.error('No token found in localStorage');
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        console.log('Fetched Notifications:', data); // Log the fetched data
        setNotifications(data || []); // Ensure it's always an array
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError(error.message); // Set error message
      }
    };

    fetchNotifications();
  }, []);

  // Function to mark a notification as read
  const markAsRead = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      setError('No token found. Please log in.');
      return;
    }

    try {
      await fetch(`http://localhost:3000/notifications/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Update local state to mark the notification as read
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      {/* Display Error Message */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {/* Display Notifications */}
      <ul>
        {Array.isArray(notifications) && notifications.map((notification) => (
          <li
            key={notification.id}
            style={{ color: notification.is_read ? 'gray' : 'black' }}
          >
            {notification.message}
            {!notification.is_read && (
              <button onClick={() => markAsRead(notification.id)} style={{ marginLeft: '10px' }}>
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationPage;
