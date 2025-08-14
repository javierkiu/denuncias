import { Route, Routes } from "react-router-dom"
import { ReportPage } from "./ReportPage"

export const ReportRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<ReportPage/>}/>
    </Routes>
  )
}
