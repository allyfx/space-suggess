import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  max-height: 120px;

  padding: 24px;
  border-bottom: 2px solid #e2e2e2;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    max-height: 45px;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;

  button {
    height: 41px;
  }
`;

export const Main = styled.div`
  max-width: 800px;
  width: 100%;

  margin: 0 auto;
`;

export const RoomTitle = styled.div`
  margin: 32px 0 24px;
  display: flex;
  align-items: center;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: #29292e;
  }

  span {
    margin-left: 16px;
    padding: 8px 16px;

    background: #e559f9;
    border-radius: 9999px;

    font-weight: 500;
    font-size: 14px;
    color: #FFF;
  }
`;

export const Form = styled.form`
  textarea {
    width: 100%;
    min-height: 130px;

    padding: 16px;

    border: 0;
    border-radius: 8px;
    
    background: #fefefe;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

    resize: vertical;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 16px;

  > span {
    font-size: 14px;
    color: #737380;
    font-weight: 500;

    button {
      border: 0;
      background: transparent;
      
      font-size: 14px;
      font-weight: 500;
      color: #835afd;

      text-decoration: underline;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 8px;

    font-weight: 500;
    font-size: 14px;
    color: #29292e;
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  
  border-radius: 50%;
`;

export const SuggestionsList = styled.div`
  margin-top: 32px;
`;
