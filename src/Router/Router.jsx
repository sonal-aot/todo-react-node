import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "../pages";

const AppRouter = () => {
    return (
        <Router basename="/todo-react-node">
            <Routes>
                <Route path="/" element={<Index />} />
            </Routes>
        </Router>
    )
}

export default AppRouter