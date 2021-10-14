import styled from 'styled-components';

const StyledInputDate = styled.input`
  background-color: #52555d;
  border: none;
  border-radius: 7px;
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.primaryFont};
  padding: 0.15rem 0.25rem;
  &::-webkit-calendar-picker-indicator {
    filter: invert(0.65);
  }
`;

export default StyledInputDate;
