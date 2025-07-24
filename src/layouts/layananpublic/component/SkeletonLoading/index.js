import React from 'react';
import { Container, Grid, Box, Skeleton, Divider } from '@mui/material';

const SkeletonLoading = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 768,
        paddingY: 4,
        px: 3,
        margin: '0 auto',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Banner Skeleton */}
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={220} />
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Course Info Skeleton */}
        <Grid item xs={12} md={8}>
          {/* Title and subtitle */}
          <Skeleton variant="text" width="70%" height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={30} sx={{ mb: 3 }} />

          {/* Description paragraphs */}
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
          </Box>

          {/* Course syllabus */}
          <Skeleton variant="text" width="30%" height={30} sx={{ mb: 2 }} />
          {[...Array(8)].map((_, i) => (
            <Skeleton
              key={i}
              variant="text"
              width={Math.floor(Math.random() * 40) + 60 + '%'}
              height={20}
              sx={{ mb: 1 }}
            />
          ))}
        </Grid>

        {/* Right Column - Instructor & Enrollment Skeleton */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: 'background.paper',
            }}
          >
            {/* Instructor avatar and name */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Skeleton variant="circular" width={64} height={64} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={30} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="40%" height={20} />
              </Box>
            </Box>

            {/* Instructor bio */}
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="95%" height={20} sx={{ mb: 3 }} />

            <Divider sx={{ mb: 3 }} />

            {/* Course Info section */}
            <Skeleton variant="text" width="40%" height={25} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
              <Skeleton variant="rectangular" width={80} height={20} />
              <Skeleton variant="text" width={90} height={20} sx={{ ml: 1 }} />
            </Box>

            {/* Enroll Button */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={45}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SkeletonLoading;