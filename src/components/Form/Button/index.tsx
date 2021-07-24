import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  outlined?: boolean;
  children: ReactNode;
}

export function Button({
  outlined = false,
  children,
  ...props
}: Props) {
  return (
    <Container
      outlined={outlined}
      {...props}
    >
      {children}
    </Container>
  );
}
