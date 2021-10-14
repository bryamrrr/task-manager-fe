import styled from 'styled-components';

const StyledTextInput = styled.input`
  border: 1px solid ${({ theme }) => theme.buttonColor};
  border-radius: 5px;
  font-family: ${({ theme }) => theme.primaryFont};
  padding: 0.5rem;
  outline-width: 0;
`;

export default StyledTextInput;
