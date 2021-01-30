import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';

import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Link from '../src/components/Link';
import QuizBackground from '../src/components/QuizBackground';
import QuizButton from '../src/components/QuizButton';
import QuizContainer from '../src/components/QuizContainer';
import QuizFooter from '../src/components/QuizFooter';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>Demon Slayer Quiz</h1>
            </Widget.Header>
            <Widget.Content>
              <p style={{ textAlign: 'justify' }}>Teste os seus conhecimentos sobre Demon Slayer!</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  router.push(`/quiz?name=${name}`);
                }}
              >
                <Input
                  name="userName"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Informe o seu nome..."
                  value={name}
                />
                <QuizButton type="submit" disabled={name.length === 0}>
                  Jogar
                </QuizButton>
              </form>
            </Widget.Content>
          </Widget>
          <Widget
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <ul>
                {db.external.map(({ quizName, quizURL }, quizIndex) => {
                  const quizId = `quiz__${quizIndex}`;
                  const [, userName] = (
                    quizURL.replace('https://', '').replace('.vercel.app/', '').replace('contribuidores', '').split('.')
                  );
                  return (
                    <li key={quizId} style={{ textAlign: 'center' }}>
                      <Widget.Topic as={Link} href={quizURL} target="_blank" rel="noreferrer">
                        {quizName}
                        {' | '}
                        {userName}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <QuizFooter />
        </QuizContainer>
        <GitHubCorner projectUrl={db.githubProjectUrl} />
      </QuizBackground>
    </>
  );
}
