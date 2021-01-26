import styled from 'styled-components'

const Widget = styled.div`
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  margin-top: 24px;
  overflow: hidden;
  
  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  
  & > *:first-child {
    margin-top: 0;
  }
  
  & > *:last-child {
    margin-bottom: 0;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Header = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: flex-start;
  padding: 18px 32px;
  
  * {
    margin: 0;
  }
`;

export default Widget;