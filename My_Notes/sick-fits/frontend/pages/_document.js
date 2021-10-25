import Document, { Html, NextScript, Main } from "next/document";

export default class AppDocument extends Document {
  render() {
    <Html>
      {/* <Head></Head> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>;
  }
}
