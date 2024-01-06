import { Router } from "./router/Router";
import "./App.css";
import { AnnouncementProvider } from "./context/Anouncement.jsx";

function App() {
  return (
    <AnnouncementProvider>
      <Router />
    </AnnouncementProvider>
  );
}

export default App;
