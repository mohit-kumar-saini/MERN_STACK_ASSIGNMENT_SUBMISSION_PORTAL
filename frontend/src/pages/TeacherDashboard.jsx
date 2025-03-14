import React, { useState, useEffect } from "react";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/assignments", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch data");
      }
      
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setError("Error fetching student data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStatusUpdate = async (assignmentId, status) => {
    try {
      const feedback = status === 'rejected' ? prompt("Please provide feedback for rejection:") : "";
      
      const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status, feedback })
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      await fetchStudents(); // Refresh the list after successful update
      setError(""); // Clear any existing errors
    } catch (error) {
      setError("Error updating assignment status: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <h2>Teacher Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {students.length === 0 ? (
        <p>No assignments submitted yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Enrollment No.</th>
              <th>Assignment URL</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.enrollmentNo}</td>
                <td>
                  <a href={student.assignmentUrl} target="_blank" rel="noopener noreferrer">
                    View Assignment
                  </a>
                </td>
                <td>{new Date(student.submittedAt).toLocaleDateString()}</td>
                <td>{student.status}</td>
                <td>{student.feedback || '-'}</td>
                <td>
                  <select
                    value={student.status}
                    onChange={(e) => handleStatusUpdate(student._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accept</option>
                    <option value="rejected">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
