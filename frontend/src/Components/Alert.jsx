import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

const alertTypes = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export default function BasicAlerts({ type = 'info', duration = 3000, string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <Stack
      sx={{
        position: 'absolute',
        top: '7%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Center the alert
        zIndex: 1000,
        width: 'auto',
        maxWidth: '400px', // Optional: Limit the width of the popup
        animation: 'fadeIn 0.5s', // Optional: Add fade-in effect
      }}
      spacing={2}
    >
      <Alert
        severity={alertTypes[type]}
        sx={{
          borderRadius: '8px', // Optional: Rounded corners for the alert
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Shadow for popup effect
          padding: '10px 20px', // Optional: Add some padding
        }}
      >
        {string}
      </Alert>
    </Stack>
  );
}
