// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for the applicant
const applicantSchema = new mongoose.Schema({
    jobid: {
        type: String,
        // required: true
    },
    jobtitle: {
        type: String,
        // required: true
    },
    jobemail: {
        type: String,
        // required: true
    },
    applicant: [{
        name: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            // required: true
        },
        number: {
            type: String,
            // required: true
        },
        skills: {
            type: String,
            // required: true
        },
        file: {
            type: String,
            // required: true
        },
        experienceLevel: {
            type: String,
            // required: true
        },
        experienceinyears: {
            type: String
        }
    }]
});

// Create a model using the schema
const Applicant = mongoose.model('Applicant', applicantSchema);

// Export the model
module.exports = Applicant;
