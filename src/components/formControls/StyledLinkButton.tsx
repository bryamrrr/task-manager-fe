import styled from 'styled-components';

const StyledLinkButton = styled.button`
  display: inline-block;
  border: none;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  margin: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.link};
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export default StyledLinkButton;
