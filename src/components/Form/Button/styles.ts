import styled, { css } from 'styled-components';

type Props = {
  outlined: boolean;
}

export const Container = styled.button<Props>`
  height: 50px;
  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #835AFD;
  border-radius: 8px;

  border: 0;

  font-weight: 500;
  font-size: 16px;
  color: #FEFEFE;

  transition: filter 0.2s;

  svg {
    margin-right: 8px;
  }

  ${({ outlined }) => outlined && css`
    background: #fff;
    border: 1px solid #835afd;
    color: #835afd;
  `}

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
