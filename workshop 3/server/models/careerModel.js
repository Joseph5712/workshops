const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: Number },
    description: { type: String }
});

module.exports = mongoose.model('Career', careerSchema);
