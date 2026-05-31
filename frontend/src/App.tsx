import { Route, Routes } from "react-router";
import { QuestionnairePage } from "./pages";

function App() {
  return (
    <div className="root">
      <Routes>
        <Route path="/questionnaire" element={<QuestionnairePage />} />
      </Routes>
    </div>
  );
}

export default App;
