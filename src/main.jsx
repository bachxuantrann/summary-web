import { createRoot } from "react-dom/client";
import "antd/dist/reset.css"; // Ant Design base css
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
