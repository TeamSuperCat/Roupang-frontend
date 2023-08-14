import { RouterProvider } from "react-router";
import { routers } from "./router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyles />
        <Header />
        <RouterProvider router={routers} />
        <ReactQueryDevtools />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
