import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PropTypes from 'prop-types';

const ErrorLoadData = ({ title="" ,message=""}) => {
  const handleReload = () => {
    window.location.reload();
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
        <ErrorOutlineIcon color="error" fontSize='large' sx={{ fontSize: 80 }} />
      </Box>
      <Typography variant="h5" gutterBottom fontWeight="bold" color="error">
        {title ? title : "Oops! Failed to load programs data"}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {message ? message : "There was a problem retrieving the programs details. Please check your internet connection or try again later."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleReload}
        sx={{ textTransform: 'none', px: 4, py: 1.5 }}
      >
        Muat Ulang
      </Button>
    </Container>
  );
};

ErrorLoadData.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
}

export default ErrorLoadData;