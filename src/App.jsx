import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigator from "./config/Navigator"
import { ContextProvider } from "./helper/ContextApi"

function App() {
  return (
    <Router>
      <ContextProvider>
        <Navigator />
      </ContextProvider>
    </Router>
  );
}

export default App;
