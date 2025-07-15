import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useAlert } from '../Store/useAlert';

const alertTypes = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export default function BasicAlerts({ duration = 3000 }) {
  const { alert, hideAlert } = useAlert();

  useEffect(() => {
    let timer;
    if (alert.visible) {
      timer = setTimeout(() => {
        hideAlert();
      }, duration);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [alert.visible, duration, hideAlert]);

  if (!alert.visible) return null;

  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '7%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        width: 'auto',
        maxWidth: '400px',
        animation: 'fadeIn 0.5s',
        '@keyframes fadeIn': {
          'from': { opacity: 0, transform: 'translate(-50%, -70%)' },
          'to': { opacity: 1, transform: 'translate(-50%, -50%)' },
        },
      }}
      spacing={2}
    >
      <Alert
        severity={alertTypes[alert.type]}
        sx={{
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '10px 20px',
        }}
      >
        {alert.message}
      </Alert>
    </Stack>
  );
}
