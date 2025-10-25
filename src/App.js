import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IndividualAgreement, InnerPage, LegalEntityAgreement } from "./pages";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
