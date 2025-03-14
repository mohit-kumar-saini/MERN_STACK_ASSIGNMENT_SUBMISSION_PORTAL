const express = require("express");
const { User, Assignment } = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

// Auth routes
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, enrollmentNo } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role,
            enrollmentNo: role === 'student' ? enrollmentNo : undefined
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected routes
router.post("/submit", auth, async (req, res) => {
    try {
        const { assignmentUrl } = req.body;
        const student = await User.findById(req.user.userId);
        const newAssignment = new Assignment({
            studentId: req.user.userId,
            name: student.name,
            enrollmentNo: student.enrollmentNo,
            assignmentUrl
        });
        await newAssignment.save();
        res.status(201).json({ message: "Assignment submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get assignments for a specific student
router.get("/submissions", auth, async (req, res) => {
    try {
        const assignments = await Assignment.find({ studentId: req.user.userId });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update assignment status (teachers only)
router.patch("/assignments/:id/status", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user.role !== 'teacher') {
            return res.status(403).json({ error: "Access denied" });
        }

        const { status, feedback } = req.body;
        const assignment = await Assignment.findById(req.params.id);
        
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        assignment.status = status;
        assignment.feedback = feedback;
        await assignment.save();

        res.json(assignment);
    } catch (error) {
        console.error("Status update error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update profile
router.patch("/profile", auth, async (req, res) => {
    try {
        const { name, profile } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name, profile },
            { new: true }
        ).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all assignments (teachers only)
router.get("/assignments", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user.role !== 'teacher') {
            return res.status(403).json({ error: "Access denied" });
        }
        const assignments = await Assignment.find().populate('studentId', 'name');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
