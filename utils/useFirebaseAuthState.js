import { useState, useEffect } from 'react';
import { auth } from '@/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

// code
function useFirebaseAuthState() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // 로그아웃 시
        setUser(undefined);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return user;
}

export default useFirebaseAuthState;
