import {
  Routes,
  Route,
} from "react-router-dom";

import { Dashboard, Agenda, Actions, Shows, CreateShows} from "./_index";

const App = () => {
  return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}  />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/spectacles" element={<Shows />} />
        <Route path="/creation-spectacle" element={<CreateShows />} />
      </Routes>
  );
}

export default App;
