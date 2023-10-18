import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <HomePage />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App