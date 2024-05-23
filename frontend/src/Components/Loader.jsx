
import styled, { keyframes } from 'styled-components';

const moving = keyframes`
  50% {
    width: 100%;
  }
  100% {
    width: 0;
    right: 0;
    left: unset;
  }
`;

const LoaderContainer = styled.div`
  display: block;
  --height-of-loader: 4px;
  --loader-color: #00e297;
  width: 130px;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
`;

const LoaderBar = styled.div`
  position: absolute;
  background: var(--loader-color);
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 30px;
  animation: ${moving} 1s ease-in-out infinite;
`;
const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Loader = () => {
  return (
    <>
    <Container>
    <LoaderContainer>
      <LoaderBar />
    </LoaderContainer>
    </Container>
    </>
  );
};

export default Loader;
