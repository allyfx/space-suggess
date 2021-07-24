import { useEffect, useState } from "react";

import { useAuth } from "./useAuth";
import { database } from "../services/firebase";

type FirebaseSuggestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isDone: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>

type SuggestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isDone: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {
  const { user } = useAuth();
  
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const [title, setTitle] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseSuggestions: FirebaseSuggestions = databaseRoom.suggestions ?? {};

      const parsedSuggestions = Object.entries(firebaseSuggestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isDone: value.isDone,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      });

      parsedSuggestions.sort((a, b) => b.likeCount - a.likeCount)

      setTitle(databaseRoom.title);
      setSuggestions(parsedSuggestions);
      setIsAdmin(databaseRoom.authorId === user?.id);
    });

    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return { suggestions, title, isAdmin };
}
