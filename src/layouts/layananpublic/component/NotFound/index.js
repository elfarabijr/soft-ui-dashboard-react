import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // fallback to homepage if no history
      window.location.href = '/';
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 768,
        paddingY: 6,
        px: 3,
        margin: '0 auto',
        fontFamily: "'Roboto', sans-serif",
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'text.secondary',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
      </Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="error">
        404: Course Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The course you are looking for does not exist or has been removed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ textTransform: 'none', px: 4, py: 1.5 }}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default NotFound;