import styled from 'styled-components';

const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 14px;
  text-align: center;
`;

export default StyledErrorMessage;
