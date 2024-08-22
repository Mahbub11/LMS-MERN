import "./App.css";
import { Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./Context/global-context";
import StepContainer from "./pages/courses/StepContainer"

function App() {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/upload-course" element={<StepContainer></StepContainer>} />
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
