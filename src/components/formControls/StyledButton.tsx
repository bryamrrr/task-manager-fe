import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  border: none;
  border-radius: 7px;
  color: ${({ theme }) => theme.buttonColor};
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 0.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? '0.5' : '0.85')};
  }
`;

export default StyledButton;
