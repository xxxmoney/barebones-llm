import {BrowserRouter, Routes, Route} from 'react-router';
import HomeRoute from './routes/home/HomeRoute.tsx';
import ChatRoute from './routes/chat/ChatRoute.tsx';

function App() {

  return (
    <>
      <div>
        <header>
          {/* TODO: navigation */}
        </header>

        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/chat" element={<ChatRoute />} />
            </Routes>
          </BrowserRouter>
        </main>

        <footer></footer>
      </div>
    </>
  );
}

export default App;
