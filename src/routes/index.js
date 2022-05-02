import {
  Routes,
  Route,
} from "react-router-dom";

import { Dashboard, Agenda, Actions, Shows, Login } from "./_index";

const App = () => {
  return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/shows" element={<Shows />} />
      </Routes>
  );
}

export default App;
