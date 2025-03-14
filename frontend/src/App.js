import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StudentDashboard />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
