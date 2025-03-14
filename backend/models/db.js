const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], required: true },
    enrollmentNo: { type: String, unique: true, sparse: true },
    profile: {
        phone: String,
        department: String,
        avatar: String
    }
});

const assignmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    enrollmentNo: { type: String, required: true },
    assignmentUrl: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    feedback: { type: String },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model("User", userSchema),
    Assignment: mongoose.model("Assignment", assignmentSchema)
};
