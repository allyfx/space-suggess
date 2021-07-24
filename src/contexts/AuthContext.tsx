import {
  useState,
  useEffect,
  ReactNode,
  createContext
} from 'react';

import { auth, firebase } from '../services/firebase';

interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface AuthContextData {
  user?: User;
  signInWithGithub: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

interface Props {
  children?: ReactNode;
}

export function AuthContextProvider({
  children
}: Props) {
  const [user, setUser] = useState<User>();

  async function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider()

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Github Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Github Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGithub
    }}>
      {children}
    </AuthContext.Provider>
  )
}
