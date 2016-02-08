import mongoose from 'mongoose';

const ImgSearchSchema = new mongoose.Schema({
	term: String,
	timestamp: String
});

module.exports = ImgSearchSchema;