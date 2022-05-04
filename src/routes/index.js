import {
  Routes,
  Route,
} from "react-router-dom";

import { Dashboard, Agenda, Actions, Shows, CreateEvent} from "./_index";

const App = () => {
  return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard key={Math.floor(Math.random() * 10000)} />}  />
        <Route path="/agenda" element={<Agenda key={Math.floor(Math.random() * 10000)} />} />
        <Route path="/agenda/create" element={<CreateEvent key={Math.floor(Math.random() * 10000)} />} />
        <Route path="/actions" element={<Actions key={Math.floor(Math.random() * 10000)} />} />
        <Route path="/shows" element={<Shows key={Math.floor(Math.random() * 10000)} />} />
      </Routes>
  );
}

export default App;
