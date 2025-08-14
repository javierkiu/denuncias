import { Route, Routes } from "react-router-dom"
import { HomeRouter } from "../pages/home/HomeRouter"
import { FormRouter } from "../pages/form/FormRouter"
import { ReportRouter } from "../pages/denuncias/ReportRouter"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<HomeRouter/>}/>
        <Route path="/view-reports" element={<ReportRouter/>}/>
        <Route path="/fill-report" element={<FormRouter/>}/>
    </Routes>
  )
}
