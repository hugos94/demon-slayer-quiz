import React from 'react';

import db from '../db.json';

import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizFooter from '../src/components/QuizFooter';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

export default function QuizPage() {
  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              Página 1 de 5
            </Widget.Header>
            <Widget.Content>
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
