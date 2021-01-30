import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  const { theme } = dbExterno;
  return (
    <>
      <ThemeProvider theme={theme}>
        <QuizScreen dbExterno={dbExterno} />
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const dbExterno = await fetch('https://warrior-nun-quiz.nayaraholanda.vercel.app/api/db')
    .then((response) => response.json())
    .then((response) => response);

  return {
    props: {
      dbExterno,
    },
  };
}
