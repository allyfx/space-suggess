import Image from 'next/image';

import copyImg from '../../assets/copy.svg';

import { Container } from './styles';

interface Props {
  code: string;
}

export function RoomCode({
  code
}: Props) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <Container onClick={copyRoomCodeToClipboard}>
      <div>
        <Image src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #{code}</span>
    </Container>
  )
}