import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import StudentPage from "./Pages/StudentPage"
import SendMail from "./Pages/SendMail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/students/:id" Component={StudentPage} />
        <Route path="/sendmail" Component={SendMail} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
