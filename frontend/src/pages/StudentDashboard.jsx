import React, { useState, useEffect } from "react";

export default function StudentDashboard() {
  const [formData, setFormData] = useState({
    name: "",
    enrollmentNo: "",
    assignmentUrl: ""
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/submissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      setError("Error fetching submissions");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // Add token
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        fetchSubmissions(); // Refresh submissions after successful submit
        setTimeout(() => setSuccess(false), 3000);
        setFormData({
          name: "",
          enrollmentNo: "",
          assignmentUrl: ""
        });
      } else {
        setError(data.error || "Error submitting assignment");
      }
    } catch (error) {
      setError("Network error: Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {success && (
        <div className="success">
          Assignment submitted successfully! ✨
        </div>
      )}
      <form onSubmit={handleSubmit} className="submission-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="enrollment">Enrollment Number</label>
          <input
            id="enrollment"
            type="text"
            placeholder="Enter Enrollment No."
            value={formData.enrollmentNo}
            onChange={(e) => setFormData({...formData, enrollmentNo: e.target.value})}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignment">Assignment URL</label>
          <input
            id="assignment"
            type="url"
            placeholder="Enter Assignment URL"
            value={formData.assignmentUrl}
            onChange={(e) => setFormData({...formData, assignmentUrl: e.target.value})}
            disabled={loading}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? (
            <span className="loading-spinner">Submitting...</span>
          ) : (
            "Submit Assignment"
          )}
        </button>
      </form>

      <div className="submissions-list">
        <h3>Your Submissions</h3>
        {submissions.map(submission => (
          <div key={submission._id} className="submission-item">
            <p>Status: {submission.status}</p>
            {submission.feedback && <p>Feedback: {submission.feedback}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
