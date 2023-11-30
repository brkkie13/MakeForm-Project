import { useState, useEffect } from 'react';
import { auth } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

function useFirebaseAuthState() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return user;
}

export default useFirebaseAuthState;
