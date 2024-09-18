import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Box,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { SetPopupContext } from "../App";
import apiList from "../modules/apiList";
import { userType } from "../modules/isAuth";

// Updated styles to match the theme
const styles = {
  primaryColor: "#2E77BB", // Adjust this to match the second image's primary color
  backgroundColor: "#F7F9FC", // Light background
  textColor: "#4A4A4A",
  headingColor: "#333333",
  buttonColor: "#FFB74D",
};

const JobTile = (props) => {
  const { job } = props;
  const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const handleApply = () => {
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        { sop: sop },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  const deadline = new Date(job.deadline).toLocaleDateString();

  return (
    <Paper
      sx={{
        p: 3,
        m: 2,
        backgroundColor: styles.backgroundColor,
        color: styles.textColor,
        width: "100%",
      }}
      elevation={3}
    >
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: styles.headingColor }}
          >
            {job.title}
          </Typography>
          <Rating value={job.rating !== -1 ? job.rating : null} readOnly />
          <Typography>Role: {job.jobType}</Typography>
          <Typography>Salary: ₹{job.salary} per month</Typography>
          <Typography>
            Duration: {job.duration !== 0 ? `${job.duration} month` : "Flexible"}
          </Typography>
          <Typography>Posted By: {job.recruiter.name}</Typography>
          <Typography>Application Deadline: {deadline}</Typography>
          <Box sx={{ mt: 2 }}>
            {job.skillsets.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                sx={{
                  mr: 1,
                  backgroundColor: styles.primaryColor,
                  color: "#fff",
                }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: styles.buttonColor,
              color: "#fff",
              '&:hover': { backgroundColor: '#FF9800' },
              width: '100%',
            }}
            onClick={() => setOpen(true)}
            disabled={userType() === "recruiter"}
          >
            Apply
          </Button>
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ p: 4, width: "50%", mx: "auto", mt: 4 }}>
          <TextField
            label="Write SOP (up to 250 words)"
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            value={sop}
            onChange={(event) => {
              const wordCount = event.target.value
                .split(" ")
                .filter((n) => n !== "").length;
              if (wordCount <= 250) {
                setSop(event.target.value);
              }
            }}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: styles.buttonColor, color: "#fff" }}
            onClick={handleApply}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

const FilterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={{ p: 4, width: "50%", mx: "auto", mt: 4 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography>Job Type</Typography>
            {["fullTime", "partTime", "wfh"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    name={type}
                    checked={searchOptions.jobType[type]}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      })
                    }
                  />
                }
                label={type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </Grid>

          <Grid item>
            <Typography>Salary</Typography>
            <Slider
              value={searchOptions.salary}
              onChange={(event, newValue) =>
                setSearchOptions({ ...searchOptions, salary: newValue })
              }
              valueLabelDisplay="auto"
              max={100000}
              step={1000}
            />
          </Grid>

          <Grid item>
            <Typography>Duration</Typography>
            <TextField
              select
              label="Duration"
              variant="outlined"
              fullWidth
              value={searchOptions.duration}
              onChange={(event) =>
                setSearchOptions({
                  ...searchOptions,
                  duration: event.target.value,
                })
              }
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => (
                <MenuItem key={d} value={d}>
                  {d === 0 ? "All" : d}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item>
            <Typography>Sort</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchOptions.sort.salary.status}
                  onChange={(event) =>
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        salary: {
                          ...searchOptions.sort.salary,
                          status: event.target.checked,
                        },
                      },
                    })
                  }
                />
              }
              label="Salary"
            />
            <IconButton
              onClick={() =>
                setSearchOptions({
                  ...searchOptions,
                  sort: {
                    ...searchOptions.sort,
                    salary: {
                      ...searchOptions.sort.salary,
                      desc: !searchOptions.sort.salary.desc,
                    },
                  },
                })
              }
              disabled={!searchOptions.sort.salary.status}
            >
              {searchOptions.sort.salary.desc ? (
                <ArrowDownwardIcon />
              ) : (
                <ArrowUpwardIcon />
              )}
            </IconButton>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: styles.buttonColor, color: "#fff" }}
              onClick={() => getData()}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100000],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
    },
  });

  const setPopup = useContext(SetPopupContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [];
    if (searchOptions.query !== "") {
      searchParams.push(`q=${searchOptions.query}`);
    }
    Object.keys(searchOptions.jobType).forEach((key) => {
      if (searchOptions.jobType[key]) {
        searchParams.push(`jobType=${key}`);
      }
    });
    if (searchOptions.salary[0] !== 0 || searchOptions.salary[1] !== 100000) {
      searchParams.push(`salaryMin=${searchOptions.salary[0]}`);
      searchParams.push(`salaryMax=${searchOptions.salary[1]}`);
    }
    if (searchOptions.duration !== "0") {
      searchParams.push(`duration=${searchOptions.duration}`);
    }
    Object.keys(searchOptions.sort).forEach((key) => {
      if (searchOptions.sort[key].status) {
        searchParams.push(
          `sort${key}=${searchOptions.sort[key].desc ? "desc" : "asc"}`
        );
      }
    });
    const queryString = searchParams.length ? `?${searchParams.join("&")}` : "";

    axios
      .get(`${apiList.jobs}${queryString}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Search for jobs"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => getData()}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={searchOptions.query}
        onChange={(event) =>
          setSearchOptions({ ...searchOptions, query: event.target.value })
        }
      />

      <IconButton onClick={() => setFilterOpen(true)} sx={{ ml: 2 }}>
        <FilterListIcon />
      </IconButton>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job._id}>
            <JobTile job={job} />
          </Grid>
        ))}
      </Grid>

      <FilterPopup
        open={filterOpen}
        handleClose={() => setFilterOpen(false)}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        getData={getData}
      />

      <Pagination
        count={10} // Replace this with total pages from backend
        onChange={(event, value) => console.log(value)} // Handle pagination change
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default Home;
