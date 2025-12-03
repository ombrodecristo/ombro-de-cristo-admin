import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid ${props => props.theme.colors.border};
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoaderContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export function GlobalLoader() {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
}
