import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="icon" href="/favicon.ico" />
      <title>Prediction Market</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
