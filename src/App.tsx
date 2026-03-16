import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './screens/Landing'
import BookingDetails from './screens/BookingDetails'
import Login from './screens/Login'
import ConfirmSubmit from './screens/ConfirmSubmit'
import OpenApp from './screens/OpenApp'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/book" element={<BookingDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/confirm" element={<ConfirmSubmit />} />
      <Route path="/open-app" element={<OpenApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
