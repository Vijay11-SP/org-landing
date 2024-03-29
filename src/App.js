import * as React from "react";
import "./App.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import FormComponent from "./components/FormComponent";
import SuccesPage from "./components/SuccesPage";

const router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route path="/auth" element={<FormComponent />}></Route>
      <Route path="/" element={<SuccesPage />}></Route>
    </>

  )
);

function App() {
  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
