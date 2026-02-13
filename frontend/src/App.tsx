import { Route, Routes } from 'react-router'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="match" element={<Matching />} />
      <Route path="results" element={<Results />} />
      <Route path="register" element={<Register />} />
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="profile" element={<Profile />} /> */}
      {/* <Route path="chat" element={<Chat />} /> */}
    </Routes>
  )
}

export default App
