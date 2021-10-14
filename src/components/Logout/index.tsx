import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateCurrentUser } from '../../redux/features/currentUser';
import { clearStorage } from '../../utils/storage';
import { StyledLinkButton } from '../formControls';
import useGoToPages from '../hooks/useGoToPages';

const StyledWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Logout = () => {
  const dispatch = useDispatch();
  const { goToLogin } = useGoToPages();

  const handleClick = () => {
    clearStorage();
    dispatch(updateCurrentUser(undefined));
    goToLogin();
  };

  return (
    <StyledWrapper>
      <StyledLinkButton onClick={handleClick}>Logout</StyledLinkButton>
    </StyledWrapper>
  );
};

export default Logout;
