import React from 'react';

function NotificationItem({ message, isRead }) {
  return (
    <li style={{ color: isRead ? 'gray' : 'black' }}>
      {message}
    </li>
  );
}

export default NotificationItem;
