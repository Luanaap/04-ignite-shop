 
import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContextProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <ToastContainer />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
