import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppLayout from './routes/layout/AppLayout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomeRoute from './routes/home/HomeRoute.tsx';
import ChatListRoute from './routes/chat/ChatListRoute.tsx';
import ChatRoute from './routes/chat/ChatRoute.tsx';
import ConfigurationRoute from './routes/configuration/ConfigurationRoute.tsx';
import RequiredConfigurationLayout from './routes/layout/RequiredConfigurationLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/configuration" element={<ConfigurationRoute />} />
          
          <Route element={<RequiredConfigurationLayout />}>
            <Route path="/chats" element={<ChatListRoute />} />
            <Route path="/chat/:id" element={<ChatRoute />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
