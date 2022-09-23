import "./App.css";
import { Route, Routes } from "react-router";
import ChatLayout from "./Layout/ChatLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        <Route path="*" element={<ChatLayout />} />
      </Routes>
    </div>
  );
}

export default App;
