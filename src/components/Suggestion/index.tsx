/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react';

import {
  Container,
  UserInfo
} from './styles';

interface Props {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isDone: boolean;
  children?: ReactNode;
}

export function Suggestion({
  author,
  content,
  isDone = false,
  children
}: Props) {
  return (
    <Container isDone={isDone}>
      <p>{content}</p>
      
      <footer>
        <UserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfo>
        <div>
          {children}
        </div>
      </footer>
    </Container>
  );
}
