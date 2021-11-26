import NextHead from "next/head";

export default function Head() {
  return (
    <NextHead>
      <title>Terralerts</title>
      <meta name="description" content="Alerts for prices on Coinhall" />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Ubuntu+Mono&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  );
}
