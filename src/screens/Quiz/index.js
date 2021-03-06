/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import AlternativesForm from '../../components/AlternativesForm';
import BlackLinkArrow from '../../components/BlackLinkArrow';
import GitHubCorner from '../../components/GitHubCorner';
import QuizBackground from '../../components/QuizBackground';
import QuizButton from '../../components/QuizButton';
import QuizContainer from '../../components/QuizContainer';
import QuizFooter from '../../components/QuizFooter';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';

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

function ResultQuiz({ results, totalQuestions }) {
  return (
    <>
      <Widget>
        <Widget.Header>
          Tela de Resultados
        </Widget.Header>
        <Widget.Content>
          <p>
            {`Você acertou ${results.filter(Boolean).length} de ${totalQuestions} questões!`}
          </p>

          <ul>
            {results.map((result, resultIndex) => {
              const answerID = `result__${resultIndex}`;
              return (
                <li key={answerID}>
                  Pergunta #
                  {resultIndex + 1}
                  {' | '}
                  Resultado:
                  {' '}
                  {result === true ? 'Acertou' : 'Errou'}
                </li>
              );
            })}
          </ul>
        </Widget.Content>
      </Widget>
    </>
  );
}

function QuestionWidget({
  addResult,
  onSubmit,
  question,
  questionIndex,
  totalQuestions,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);

  const hasAlternativeSelected = selectedAlternative !== undefined;
  const isCorrect = selectedAlternative === question.answer;

  const questionId = `question__${questionIndex}`;

  return (
    <>
      <Widget>
        <Widget.Header>
          <BlackLinkArrow href="/" />
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

          <AlternativesForm
            onSubmit={
              (event) => {
                event.preventDefault();
                setIsFormSubmitted(true);
                setTimeout(() => {
                  addResult(isCorrect);
                  setIsFormSubmitted(false);
                  setSelectedAlternative(undefined);
                  onSubmit();
                }, 1 * 1000);
              }
            }
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;
              return (
                <Widget.Topic
                  as="label"
                  data-selected={isSelected}
                  data-status={isFormSubmitted && alternativeStatus}
                  htmlFor={alternativeId}
                  key={alternativeId}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onClick={() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                    value={alternativeIndex}
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
            {/* <pre>{JSON.stringify(question, null, 4)}</pre> */}
            <QuizButton type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </QuizButton>

            <p style={{ textAlign: 'center' }}>
              {isFormSubmitted && isCorrect && <strong>Você acertou! :D</strong>}
              {isFormSubmitted && !isCorrect && <strong>Você errou! :/</strong>}
            </p>
          </AlternativesForm>
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

export default function QuizPage({ dbExterno }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const [screenState, setScreenState] = useState(screenStates.LOADING);

  const questionIndex = currentQuestion;
  const question = dbExterno.questions[questionIndex];

  const totalQuestions = dbExterno.questions.length;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    const timeout = setTimeout(() => setScreenState(screenStates.QUIZ), 1 * 1000);
    return () => clearTimeout(timeout);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <QuizBackground backgroundImage={dbExterno.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              onSubmit={handleSubmitQuiz}
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              addResult={addResult}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && (
            <ResultQuiz
              results={results}
              totalQuestions={totalQuestions}
            />
          )}

          <QuizFooter />
        </QuizContainer>
        <GitHubCorner projectUrl={dbExterno.githubProjectUrl} />
      </QuizBackground>
    </>
  );
}
