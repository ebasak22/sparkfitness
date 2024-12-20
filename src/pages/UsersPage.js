import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersPage.css'; // Optional: Add CSS for better styling

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5; // Number of users per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      try {
        const response = await fetch('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          setError('Access denied: Admin access required.');
          setTimeout(() => navigate('/'), 3000); // Redirect to login after 3 seconds
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err.message);
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const startIndex = currentPage * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < users.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="users-page">
      <h2>Users Page</h2>
      <ul className="users-list">
        {paginatedUsers.map((user) => (
          <li key={user.id} className="user-item">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(users.length / usersPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={endIndex >= users.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersPage;
