import { Router } from "./router/Router";
import "./App.css";
import { AnnouncementProvider } from "./context/allanncontext/Anouncement.jsx";
import { SingleAnnounceProvider } from "./context/singleannounc/Singleannounce.jsx";

function App() {
  return (
    <AnnouncementProvider>
      <SingleAnnounceProvider>
      <Router />
      </SingleAnnounceProvider>
    </AnnouncementProvider>
  );
}

export default App;
