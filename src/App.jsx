import { useState } from 'react'
import Kakao from './Kakao.jsx'
import DetailMap from './DetailMap.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Kakao />} />
        <Route path="/detail" element={<DetailMap />} />
      </Routes>
    </Router>
  );
}
export default App
