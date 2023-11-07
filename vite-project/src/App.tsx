import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import StudentPage from "./Pages/StudentPage"
import SendMail from "./Pages/SendMail"
import LendPage from "./Pages/LendPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/students/:id" Component={StudentPage} />
        <Route path="/sendmail" Component={SendMail} />
        <Route path="/lend" Component={LendPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
