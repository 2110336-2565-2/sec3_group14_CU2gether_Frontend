import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registration from "./pages/Registation";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
