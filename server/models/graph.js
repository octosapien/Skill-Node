// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define schema for storing edges between skills
// const EdgeSchema = new Schema({
//   skill1: { type: String, required: true },
//   skill2: { type: String, required: true },
//   jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
//   weight: { type: Number, required: true }
// });

// // Define schema for the JobGraph (contains edges between skills)
// const JobGraphSchema = new Schema({
//   edges: [EdgeSchema]
// });

// // Define schema for Graph with additional weighted edges
// const WeightedEdgeSchema = new Schema({
//   skill1: { type: String, required: true },
//   skill2: { type: String, required: true },
//   weight: { type: Number, required: true }
// });

// const GraphSchema = new Schema({
//   edges: [WeightedEdgeSchema]
// });

// // Export models, ensuring that they are only defined once
// const JobGraph = mongoose.models.JobGraph || mongoose.model('JobGraph', JobGraphSchema);
// const Graph = mongoose.models.Graph || mongoose.model('Graph', GraphSchema);

// module.exports = { JobGraph, Graph };


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for Graph with additional weighted edges
const WeightedEdgeSchema = new Schema({
  skill1: { type: String   },
  skill2: { type: String },
  weight: { type: Number }
});

const GraphSchema = new Schema({
  edges: [WeightedEdgeSchema]
});

// Export model, ensuring it is only defined once
const Graph1 = mongoose.models.Graph1 || mongoose.model('Graph1', GraphSchema);



module.exports ={Graph1};
