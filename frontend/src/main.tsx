import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppLayout from './routes/layout/AppLayout.tsx';
import {BrowserRouter, Route, Routes} from 'react-router';
import HomeRoute from './routes/home/HomeRoute.tsx';
import ChatRoute from './routes/chat/ChatRoute.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/chat" element={<ChatRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
