import { RouterProvider } from "react-router";
import { routers } from "./router";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading/Loading";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <GlobalStyles />
          <RouterProvider router={routers} />
          <ReactQueryDevtools />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
