import { useState, useEffect } from 'react';
import { auth } from '@/firebase.config';
import { onAuthStateChanged, User } from 'firebase/auth';

// code
function useFirebaseAuthState(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // 로그아웃 시
        // setUser(undefined);
        setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return user;
}

export default useFirebaseAuthState;
