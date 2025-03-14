const API_BASE_URL = "http://localhost:5000/api";

export const submitAssignment = async (enrollmentNo, assignmentUrl) => {
    const response = await fetch(`${API_BASE_URL}/assignments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrollmentNo, assignmentUrl }),
    });
    return response.json();
};

export const fetchAssignments = async () => {
    const response = await fetch(`${API_BASE_URL}/assignments`);
    return response.json();
};
