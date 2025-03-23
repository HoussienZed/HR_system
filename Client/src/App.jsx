import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./assets/component/users-table";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
