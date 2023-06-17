import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './router';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/* notifications from toastify library */}
      <ToastContainer
        className='toast-position'
        position='top-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='light'
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
