/* eslint-disable @next/next/no-img-element */
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Image from 'next/image';

import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import { database } from '../../services/firebase';
import { compareHash } from '../../services/bcrypt';

import { Button } from '../../components/Form/Button';
import { RoomCode } from '../../components/RoomCode';
import { Suggestion } from '../../components/Suggestion';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  Actions,
  Main,
  RoomTitle,
  Form,
  FormFooter,
  UserInfo,
  Avatar,
  SuggestionsList,
} from '../../styles/pages/room';

export default function Room() {
  const router = useRouter();
  const { roomCode } = router.query;

  const { user } = useAuth();
  const { title, suggestions } = useRoom(String(roomCode));

  const [isAdmin, setIsAdmin] = useState(false);

  const [newSuggestion, setNewSuggestion] = useState('');

  async function handleLikeSuggestion(suggestionId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomCode}/suggestions/${suggestionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomCode}/suggestions/${suggestionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  async function handleSendSuggestion(event: FormEvent) {
    console.log("aqui")
    event.preventDefault();

    if (newSuggestion.trim() === '') return;

    if (!user) {
      throw new Error('You must be logged in.');
    }

    const suggestion = {
      content: newSuggestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isDone: false,
    }

    await database.ref(`rooms/${roomCode}/suggestions`).push(suggestion);

    setNewSuggestion('');
  }

  useEffect(() => {
    async function checkRoomPassword() {
      const currentRoom = sessionStorage.getItem('@spacesuggess/currentRoom');

      if (!roomCode || !currentRoom) return;

      const roomRef = await database.ref(`rooms/${String(roomCode)}`).get();

      if (!roomRef) {
        router.push('/');
        return;
      };

      if (roomRef.val().endedAt) {
        router.push('/');
        return;
      }

      const currentRoomParsed = JSON.parse(currentRoom);

      const isSamePassword = await compareHash(
        currentRoomParsed.password,
        roomRef.child('password').val()
      );

      if (!isSamePassword) {
        router.push('/');
        return;
      }

      setIsAdmin(roomRef.child('authorId').val() === user?.id);
    }

    checkRoomPassword();
  }, [router, user, roomCode]);

  return (
    <>
      <Head>
        <title>{title} | Space Suggess</title>
      </Head>

      <Container>
        <Header>
          <HeaderContent>
            <Image
              src={logoImg}
              alt="Space Suggess"
            />

            <Actions>
              <RoomCode code={String(roomCode)} />

              <Button outlined>
                Encerrar sala
              </Button>
            </Actions>
          </HeaderContent>
        </Header>

        <Main>
          <RoomTitle>
            <h1>Sala {title}</h1>
          </RoomTitle>

          <Form onSubmit={handleSendSuggestion}>
            <textarea
              placeholder="Qual sua sugestão?"
              onChange={(event) => setNewSuggestion(event.target.value)}
              value={newSuggestion}
            />

            <FormFooter>
              {user ? (
                <UserInfo>
                  <Avatar src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </UserInfo>
              ) : (
                <span>Para enviar uma sugestão, <button>faça seu login</button>.</span>
              )}

              <Button type="submit" disabled={!user}>
                Enviar sugestão
              </Button>
            </FormFooter>
          </Form>

          <SuggestionsList>
            {suggestions.map(suggestion => (
              <Suggestion
                key={suggestion.id}
                author={suggestion.author}
                content={suggestion.content}
                isDone={suggestion.isDone}
              >
                <button
                  className={`like-button ${suggestion.likeId ? 'liked' : ''}`}
                  type="button"
                  area-label="Marcar como gostei"
                  onClick={() => handleLikeSuggestion(suggestion.id, suggestion.likeId)}
                >
                  {suggestion.likeCount > 0 && <span>{suggestion.likeCount}</span>}

                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Suggestion>
            ))}
          </SuggestionsList>
        </Main>
      </Container>
    </>
  );
}
