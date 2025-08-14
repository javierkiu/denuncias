import { Route, Routes } from "react-router-dom"
import { FormReport } from "./FormReport"

export const FormRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<FormReport/>}/>
    </Routes>
  )
}
