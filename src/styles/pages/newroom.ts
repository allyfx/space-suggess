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

export const FooterMessage = styled.p`
  margin-top: 16px;

  text-align: center;

  font-size: 14px;
  line-height: 16px;
  color: #737380;

  a {
    margin-left: 4px;
  }
`;
