import styled from 'styled-components';

const QuizButton = styled.button`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.contrastText};
    padding: 0.75rem;
    text-transform: uppercase;
`;

export default QuizButton;
