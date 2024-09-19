const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");
const passportConfig = require("./config/passportConfig");
const connectDB = require("./config/connectDB");
const { updateGraph, findFrequentlyHiredClusters } = require("./frequently_hired_together");
const { addJobToGraph, recommendSkillsWithCosts } = require("./transition");
const Job = require('./models/job');

dotenv.config();
connectDB();

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = process.env.PORT || 4444;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up middlewares
app.use(cors());
app.use(express.json());


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(passportConfig.initialize());
// POST route to add a new job and update graphs
// app.post("/api/add-job", async (req, res) => {
//   try {
//     console.log('Request received:', req.body); // Log the entire request body

//     const {
//       userId, title, maxApplicants, maxPositions,
//       activeApplications, acceptedCandidates, deadline,
//       skillsets, jobType, duration, salary, rating
//     } = req.body;

//     // Validate the input
//     // if (!userId || !title || !jobType) {
//     //   return res.status(400).send('Missing required fields: userId, title, and jobType are required.');
//     // }

//     if (maxApplicants && (!Number.isInteger(maxApplicants) || maxApplicants <= 0)) {
//       return res.status(400).send('maxApplicants should be a positive integer.');
//     }

//     if (maxPositions && (!Number.isInteger(maxPositions) || maxPositions <= 0)) {
//       return res.status(400).send('maxPositions should be a positive integer.');
//     }

//     if (activeApplications && (!Number.isInteger(activeApplications) || activeApplications < 0)) {
//       return res.status(400).send('activeApplications should be a non-negative integer.');
//     }

//     if (acceptedCandidates && (!Number.isInteger(acceptedCandidates) || acceptedCandidates < 0)) {
//       return res.status(400).send('acceptedCandidates should be a non-negative integer.');
//     }

//     if (deadline && new Date(deadline) <= new Date()) {
//       return res.status(400).send('Deadline should be greater than the current date.');
//     }

//     if (duration && (!Number.isInteger(duration) || duration < 0)) {
//       return res.status(400).send('Duration should be a non-negative integer.');
//     }

//     if (salary && (!Number.isInteger(salary) || salary < 0)) {
//       return res.status(400).send('Salary should be a non-negative integer.');
//     }

//     if (rating !== undefined && (rating < -1.0 || rating > 5.0)) {
//       return res.status(400).send('Rating should be between -1.0 and 5.0.');
//     }

//     // Create and save a new job
//     const job = new Job({
//       userId,
//       title,
//       maxApplicants,
//       maxPositions,
//       activeApplications,
//       acceptedCandidates,
//       deadline,
//       skillsets,
//       jobType,
//       duration,
//       salary,
//       rating
//     });
    
//     await job.save();
//     console.log('Job saved:', job);

//     // Update the graphs with job data
//     await updateGraph(job._id, skillsets, salary, maxApplicants);
//     console.log('Graph updated');
//     await addJobToGraph(job._id, skillsets, salary, maxApplicants);
//     console.log('Job edges added to graph');

//     res.status(201).send('Job added and graphs updated');
//   } catch (error) {
//     console.error('Error adding job and updating graphs:', error);
//     res.status(500).send('Server error');
//   }
// });

// POST route to handle /transition logic
app.post("/api/transition", async (req, res) => {
  try {
    const { knownSkills } = req.body;
    if (!knownSkills || !Array.isArray(knownSkills)) {
      return res.status(400).send('Known skills are required and must be an array');
    }

    const recommendations = await recommendSkillsWithCosts(knownSkills);

    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error getting transition recommendations:', error);
    res.status(500).send('Server error');
  }
});

// GET route to handle /frequent logic
app.get("/api/frequent", async (req, res) => {
  try {
    const { cutoff } = req.query;

    if (!cutoff) {
      return res.status(400).send('Cutoff is required');
    }

    const clusters = await findFrequentlyHiredClusters(parseInt(cutoff, 10));

    res.status(200).json(clusters);
  } catch (error) {
    console.error('Error getting frequently hired clusters:', error);
    res.status(500).send('Server error');
  }
});





// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", [
  require("./routes/jobsRoutes"),
  require("./routes/ratingRoutes"),
  require("./routes/userRoutes"),
  require("./routes/jobApplicationRoutes"),
  require("./recommendedSkills"),
  require("./skillRanking")
]);
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));


app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
