import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROOT } from "./configs/routeNames";
import { Provider } from "react-redux";
import store from "./redux/store";

import { TranslateProvider } from './translate';

import Home from 'Modules/Home';
import NoPage from 'Modules/Home/NoPage';

import { TabTitle } from "./utils/GeneralFunction";

// Context
import { ResponsiveProvider } from "./app/contexts/ResponsiveContext";

function App() {
  TabTitle('Billing System');

  return (
    <ResponsiveProvider>
      <TranslateProvider>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route
                path={ROOT}
                element={<Home />}
              />
              {/* <Route path="/register" element={<Login Comp={'Register'} />} /> */}
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Router>
        </Provider>
      </TranslateProvider>
    </ResponsiveProvider>
  )
};

export default App
