import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./app/homepage";
import Verify from "./pages/verify";
import YoutubeMusic from './pages/youtube-music';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <BrowserRouter>
         <Routes>
             <Route path="/" element={<Homepage />} />
             <Route path="/verify/:token" element={<Verify />} />
             <Route path='/youtube-music' element={<YoutubeMusic />} />
         </Routes>
     </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
