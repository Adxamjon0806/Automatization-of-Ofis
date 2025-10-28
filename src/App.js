import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ChangeCount,
  IndividualAgreement,
  InnerPage,
  LegalEntityAgreement,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InnerPage />} />
        <Route
          path="/legal-entity-agreement"
          element={<LegalEntityAgreement />}
        />
        <Route path="/individual-agreement" element={<IndividualAgreement />} />
        <Route path="/change-count" element={<ChangeCount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
