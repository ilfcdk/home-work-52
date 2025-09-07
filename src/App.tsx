import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { router } from './app/router';

export default function App() {
  return (
    <Provider store={store}>     {/* ✅ Redux Provider тут */}
      <RouterProvider router={router} />
    </Provider>
  );
}
