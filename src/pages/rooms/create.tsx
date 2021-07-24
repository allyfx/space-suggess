import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import { generateHash } from '../../services/bcrypt';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import { MdCreate } from 'react-icons/md';

import illustrationImg from '../../assets/illustration.svg';
import logoImg from '../../assets/logo.svg';

import {
  Container,
  Aside,
  Title,
  Content,
  Main,
  MainContent,
  Form,
  FooterMessage,
} from '../../styles/pages/newroom';

export default function NewRoom() {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (name.trim() === '' || password.trim() === '') return;

    /**
     * Remember to do error validation with popup!
     */
    if (!user) return;

    const roomRef = database.ref('rooms');

    const hashedPassword = await generateHash(password);

    const newRoom = await roomRef.push({
      title: name,
      password: hashedPassword,
      authorId: user.id,
    });

    router.push(`/rooms/${newRoom.key}`);
  }

  return (
    <>
      <Head>
        <title>Nova sala | SpaceSuggess</title>
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

            <Form onSubmit={handleCreateRoom}>
              <Input
                placeholder="Nome da sala"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Input
                type="password"
                placeholder="Senha da sala"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <Button type="submit">
                <MdCreate
                  fontSize={20}
                />
                Criar sala
              </Button>
            </Form>

            <FooterMessage>
              Quer entrar em uma sala já existente?
              <Link href="/">Clique aqui</Link>
            </FooterMessage>
          </MainContent>
        </Main>
      </Container>
    </>
  )
}
