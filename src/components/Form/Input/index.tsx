import { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  ...props
}: Props) {
  return (
    <Container
      {...props}
    />
  )
}