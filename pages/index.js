import React, { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';

import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
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
          <Widget>
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
          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              {db.external.map(({ quizName, quizURL }) => (
                <p>
                  <a href={quizURL} target="_blank" rel="noreferrer">
                    <QuizButton>
                      {quizName}
                    </QuizButton>
                  </a>
                </p>
              ))}
            </Widget.Content>
          </Widget>
          <QuizFooter />
        </QuizContainer>
        <GitHubCorner projectUrl={db.githubProjectUrl} />
      </QuizBackground>
    </>
  );
}
