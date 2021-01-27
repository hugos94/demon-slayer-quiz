import React, { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';

import GitHubCorner from '../src/components/GitHubCorner';
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
              <p>Teste os seus conhecimentos sobre Demon Slayer!</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  router.push(`/quiz?name=${name}`);
                }}
              >
                <input
                  onChange={(event) => { setName(event.target.value); }}
                  placeholder="Informe o seu nome..."
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

              <p>lorem ipsum</p>
            </Widget.Content>
          </Widget>
          <QuizFooter />
        </QuizContainer>
        <GitHubCorner projectUrl={db.githubProjectUrl} />
      </QuizBackground>
    </>
  );
}
