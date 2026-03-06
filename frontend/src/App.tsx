import { Route, Routes } from "react-router";
import Landing from "./pages/Landing/Landing";
import Matching from "./pages/Matching/Matching";
import Authentication from "./pages/Authentication/Authentication";

function App() {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="matching" element={<Matching />} />
      {/* <Route path="results" element={<Results />} /> */}
      <Route path="auth" element={<Authentication />} />

      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="profile" element={<Profile />} /> */}
      {/* <Route path="chat" element={<Chat />} /> */}
    </Routes>
  );
}

export default App;
