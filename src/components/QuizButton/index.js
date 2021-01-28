import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuizButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  color: ${({ theme }) => theme.colors.contrastText};
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  outline: 0;
  padding: 10px 16px;
  text-transform: uppercase;
  transition: .3s;
  width: 100%;

  &:hover, &:focus {
    opacity: .5;
  }

  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

QuizButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default QuizButton;
