import { Route, Routes } from "react-router";
import { QuestionnairePage } from "./pages";
import { MainLayout } from "./components/layout";

function App() {
  return (
    <div className="root min-h-screen flex flex-col">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/questionnaire" element={<QuestionnairePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
