import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import EventForm from "./pages/EventForm.jsx";
import Venues from "./pages/Venues.jsx";
import VenueForm from "./pages/VenueForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/new" element={<EventForm />} />
        <Route path="/events/:id/edit" element={<EventForm />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/new" element={<VenueForm />} />
        <Route path="/venues/:id/edit" element={<VenueForm />} />
      </Routes>
    </Router>
  );
}

export default App;
