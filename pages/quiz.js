/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import db from '../db.json';

import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizButton from '../src/components/QuizButton';
import QuizContainer from '../src/components/QuizContainer';
import QuizFooter from '../src/components/QuizFooter';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

function LoadingWidget() {
  return (
    <>
      <div>
        Página de quiz
      </div>
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>

        <Widget.Content>
          [Desafio do Loading]
        </Widget.Content>
      </Widget>
    </>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  handleCheckedRadioButton,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <>
      <Widget>
        <Widget.Header>
          {/* <BlackLinkArrow href="/" /> */}
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
        </Widget.Header>
        <img
          alt="Descrição"
          src={question.image}
          style={{ height: '150px', objectFit: 'cover', width: '100%' }}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>

          <p>
            {question.description}
          </p>

          <form
            onSubmit={
              (event) => {
                event.preventDefault();
                onSubmit();
              }
            }
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                  key={alternativeId}
                >
                  <input
                    id={alternativeId}
                    name={questionId}
                    type="radio"
                    onChange={handleCheckedRadioButton}
                    value={alternativeIndex}
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
            {/* <pre>{JSON.stringify(question, null, 4)}</pre> */}
            <QuizButton type="submit">
              Confirmar
            </QuizButton>
          </form>
        </Widget.Content>
      </Widget>
    </>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState();
  const [checkedRadioButton, setCheckedRadioButton] = useState(0);

  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  const totalQuestions = db.questions.length;

  useEffect(() => {
    const timeout = setTimeout(() => setScreenState(screenStates.QUIZ), 1 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  function handleCheckedRadioButton(event) {
    setCheckedRadioButton(event.target.value);
  }

  function handleSubmitQuiz() {
    setAnswers(checkedRadioButton);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              handleCheckedRadioButton={handleCheckedRadioButton}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && <div>Você acertou X questões!</div>}

          <QuizFooter />
        </QuizContainer>
        <GitHubCorner projectUrl={db.githubProjectUrl} />
      </QuizBackground>
    </>
  );
}
