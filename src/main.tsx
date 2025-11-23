import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store/index.ts';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster
        // position="top-right"
        toastOptions={{
          // Default style
          style: {
            background: '#333',
            color: '#fff',
          },
          // Success style
          success: {
            style: {
              background: '#22c55e', // xanh lá
              color: '#ffffff',
            },
          },
          // Error style
          error: {
            style: {
              background: '#ef4444', // đỏ
              color: '#ffffff',
            },
          },
        }}
      />
    </Provider>
  </BrowserRouter>
);
