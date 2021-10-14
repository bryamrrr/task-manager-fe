import styled from 'styled-components';

const StyledTransparentTextInput = styled.input`
  border: 1px solid
    ${({ value, theme }) => (value === '' ? theme.error : 'transparent')};
  font-size: 15px;
  margin-left: -2px;

  &,
  &:focus {
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    caret-color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.primaryFont};
    outline-width: 0;
  }
  &:focus {
    border-color: transparent;
  }
`;

export default StyledTransparentTextInput;
