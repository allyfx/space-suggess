import styled from 'styled-components';


export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
`;

export const Aside = styled.aside`
  flex: 7;
  padding: 120px 80px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  background: #835AFD;
`;

export const Title = styled.strong`
  margin-top: 16px;

  font: 700 36px 'Poppins', sans-serif;
  line-height: 42px;
  color: #FFFFFF;

  .illustration {
    max-width: 320px;
  }
`;

export const Content = styled.p`
  max-width: 489px;

  font-size: 24px;
  line-height: 32px;
  margin-top: 16px;
  color: #f8f8f8;
`;

export const Main = styled.div`
  flex: 10;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 320px;

  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  margin-top: 66px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input, button {
    width: 100%;
  }

  input + input {
    margin-top: 10px;
  }

  button {
    margin-top: 38px;
  }
`;

export const Divider = styled.div`
  font-size: 14px;
  color: #a8a8b3;

  margin: 32px 0;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background: #a8a8b3;
    margin-right: 16px;
  }

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #a8a8b3;
    margin-left: 16px;
  }
`;

export const GithubButton = styled.button`
  height: 50px;
  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #A8A8B3;
  background: #F8F8F8;
  border-radius: 8px;

  font-weight: 500;
  line-height: 19px;
  color: #29292E;

  transition: background 0.2s, color 0.2s;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background: #29292E;
    color: #F8F8F8;
  }
`;

