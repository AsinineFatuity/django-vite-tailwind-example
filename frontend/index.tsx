

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // don't change order
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { LoadingIndicator, FeedbackToast } from "./src/components";
import reduxStore from "./src/redux/store";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={reduxStore}>
        <LoadingIndicator />
        <App />
        <ToastContainer newestOnTop={true} />
        <FeedbackToast />
      </Provider>
    </React.StrictMode>,
  );
}
