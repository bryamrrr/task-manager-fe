import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family:${({ theme }) => theme.primaryFont};
    transition: all 0.50s linear;
    padding: 1rem;
    margin: 0 auto;
    max-width: 500px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.headings};
  }

  p, span {
    font-size: .9rem;
  }

  h1 {
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 2rem;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;
