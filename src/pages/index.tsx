import { FormEvent, useState } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import { useAuth } from '../hooks/useAuth';

import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';

import { FiLogIn } from 'react-icons/fi';
import { AiFillGithub } from 'react-icons/ai';
import { MdCreate } from 'react-icons/md';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';

import {
  Container,
  Aside,
  Title,
  Content,
  Main,
  MainContent,
  Form,
  Divider,
  GithubButton,
} from '../styles/pages/home';

export default function Home() {
  const router = useRouter();
  const { user, signInWithGithub } = useAuth();

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  async function handleEnterRoom(event: FormEvent) {
    event.preventDefault();

    const data = {
      code,
      password,
    }

    console.log(data);
  }

  async function handleCreateNewRoom() {
    router.push('/rooms/create');
  }

  async function loginWithGithub() {
    if (!user) {
      await signInWithGithub();
    }
  }

  return (
    <>
      <Head>
        <title>Home | SpaceSuggess</title>
      </Head>

      <Container>
        <Aside>
          <Image
            src={illustrationImg}
            alt="Space Suggess ilustração"
          />

          <Title>
            Vote em um tema!
          </Title>

          <Content>
            Vote ou crie o seu tema para o próximo evento do SpaceSquad!
          </Content>
        </Aside>

        <Main>
          <MainContent>
            <Image
              src={logoImg}
              alt="Space Suggess"
            />

            <Form onSubmit={handleEnterRoom}>
              <Input
                placeholder="Digite o código da sala"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <Input
                type="password"
                placeholder="Digite a senha da sala"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <Button type="submit">
                <FiLogIn
                  fontSize={20}
                />
                Entrar na sala
              </Button>
            </Form>

            <Divider>
              ou
            </Divider>
            
            {!user ? (
              <GithubButton onClick={loginWithGithub}>
                <AiFillGithub
                  fontSize={20}
                />
                Entre com o Github
              </GithubButton>
            ) : (
              <Button outlined onClick={handleCreateNewRoom}>
                <MdCreate
                  fontSize={20}
                />
                Criar uma nova sala
              </Button>
            )}
          </MainContent>
        </Main>
      </Container>
    </>
  )
}
