import { Routes, Route } from "react-router-dom";

import {
  Dashboard,
  Agenda,
  Actions,
  Shows,
  CreateShow,
  ShowGallery,
  EditShow,
  ActionGallery,
  CreateAction,
} from "./_index";

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/spectacles" element={<Shows />} />
      <Route path="/creation-spectacle" element={<CreateShow />} />
      <Route path="/spectacle/:id/modifier" element={<EditShow />} />
      <Route path="/spectacle/:id/gallerie" element={<ShowGallery />} />
      <Route path="/actions-culturelles" element={<Actions />} />
      <Route
        path="/actions-culturelles/:id/gallerie"
        element={<ActionGallery />}
      />
      <Route path="/creation-action-culturelle" element={<CreateAction />} />
    </Routes>
  );
};

export default App;
