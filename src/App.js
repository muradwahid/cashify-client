import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { route } from './pages/routes/Router';

function App() {
  return (
    <>
      <RouterProvider router={route} />
      <Toaster />
    </>
  );
}

export default App;
