import { Route, Routes } from "react-router";
import { QuestionnairePage, LandingPage, LegalPage } from "./pages";
import { MainLayout } from "./components/layout";

function App() {
  return (
    <div className="root min-h-screen flex flex-col">
      <Routes>
        <Route element={<MainLayout />}>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* App */}
          <Route path="/questionnaire" element={<QuestionnairePage />} />

          {/* Legal */}
          <Route path="/terms"   element={<LegalPage type="terms" />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
