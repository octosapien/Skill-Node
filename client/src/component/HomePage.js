import React from 'react';
import { AppBar, Toolbar, Button, Typography, Grid, TextField, Container, Card, CardContent, CardActions, Paper, Box, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import isAuth from "../modules/isAuth"

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = (location) => {
    console.log(location);
    navigate(location);
  };

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <SearchSection />
      <JobListings handleClick={handleClick} />
      <JobCategories />
      <NewsletterSubscription />
      <Footer />
    </div>
  );
};

// Header Section
const Header = () => {
  return (
    <AppBar position="static">
      {/* Header content */}
    </AppBar>
  );
};

// Search Section
const SearchSection = () => {
  return (
    <Box sx={{ py: 5, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Search Between More Than <span style={{ color: '#2e7d32' }}>50,000</span> Open Jobs
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Job title, keywords" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Location" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Category" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button fullWidth variant="contained" color="success" size="large">
              <SearchIcon /> Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// Job Listings Section
// Job Listings Section
const JobListings = ({ handleClick }) => {
  // Check if the user is authenticated
  if (!isAuth()) {
    // Return null or a message indicating the user is not authorized, if you wish
    return null;
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography style={{ fontWeight: '700' }} variant="h3" gutterBottom textAlign="center">
        Get Your Stats
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Card for Job Transition Recommendations */}
        <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center">
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: '700' }} variant="h6">
                Job Transition Recommendations
              </Typography>
              <Typography color="textSecondary">Algorithm-based</Typography>
              <Typography color="textSecondary">Full Time</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleClick('/transition')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Try Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Card for Skill Recommendations */}
        <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center">
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: '700' }} variant="h6">
                Skill Recommendations
              </Typography>
              <Typography color="textSecondary">Algorithm-based</Typography>
              <Typography color="textSecondary">Part Time</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleClick('/recommended-skill')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Try Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Card for Frequently Hired Together */}
        <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center">
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: '700' }} variant="h6">
                Frequently Hired Together
              </Typography>
              <Typography color="textSecondary">Skills Cluster</Typography>
              <Typography color="textSecondary">Data-based</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleClick('/frequently')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Explore Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Card for Trending Skills */}
        <Grid item md={3} display="flex" justifyContent="center" style={{translate:"15px"}}>
          <Card style={{width:"500px"}}>
            <CardContent>
              <Typography style={{ fontWeight: '700' }} variant="h6">
                Trending Skills
              </Typography>
              <Typography color="textSecondary">Market Trends</Typography>
              <Typography color="textSecondary">High Demand</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleClick('/trending-skills')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Explore Now
              </Button>
            </CardActions>
            {/* hello */}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};



// Job Categories Section
const JobCategories = () => {
  const categories = [
    { name: 'Sales & Marketing', count: '1256 Jobs' },
    { name: 'Web Development', count: '1934 Jobs' },
    // Add more categories here...
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 5 }}>
      <Container>
        <Typography variant="h4" gutterBottom textAlign="center">
          Job Categories
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                  <Typography color="textSecondary">{category.count}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Newsletter Subscription Section
const NewsletterSubscription = () => {
  return (
    <Box sx={{ py: 5, textAlign: 'center', backgroundColor: '#2e7d32', color: 'white' }}>
      <Typography variant="h5" gutterBottom>
        Subscribe Our Newsletter!
      </Typography>
      <Box sx={{ mt: 2, maxWidth: 500, mx: 'auto' }}>
        <TextField
          fullWidth
          label="Enter your email"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" color="primary">
                  <MailOutlineIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

// Footer Section
const Footer = () => {
  return (
    <Box sx={{ py: 4, backgroundColor: '#333', color: 'white', textAlign: 'center' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Job Categories</Typography>
            <Typography variant="body2">Sales & Marketing</Typography>
            <Typography variant="body2">Web Development</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Job Type</Typography>
            <Typography variant="body2">Full Time</Typography>
            <Typography variant="body2">Part Time</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Resources</Typography>
            <Typography variant="body2">Blog</Typography>
            <Typography variant="body2">Contact Us</Typography>
          </Grid>
        </Grid>
        <Typography sx={{ mt: 2 }}>© 2024 SkillNode. All rights reserved.</Typography>
      </Container>
    </Box>
  );
};

export default HomePage;
