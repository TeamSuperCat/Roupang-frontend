import { RouterProvider } from "react-router";
import { routers } from "./router";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  );
}

export default App;
