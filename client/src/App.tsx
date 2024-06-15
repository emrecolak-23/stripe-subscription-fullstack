import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./auth/AuthContext";
import { Routes, Route } from "react-router-dom";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StripeSuccess from "./pages/StripeSuccess";
import StripeCancel from "./pages/StripeCancel";
import Account from "./pages/Account";

import { queryClient } from "./react-query/queryClient";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/stripe/success" element={<StripeSuccess />} />
              <Route path="/stripe/cancel" element={<StripeCancel />} />
              <Route path="/account" element={<Account />} />
            </Route>
          </Routes>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
