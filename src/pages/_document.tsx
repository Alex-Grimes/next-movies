import { Html, Head, Main, NextScript } from 'next/document'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Document() {
  return (

    <Html lang="en">
      <Head />
      <body>
          <Main />
          <NextScript />
      </body>
    </Html>
  )
}
