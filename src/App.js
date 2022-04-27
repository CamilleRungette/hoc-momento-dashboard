import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainApp from "./containers/MainApp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={< MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
