'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/modals/AuthForm';
import UserProfile from '../../components/user/UserProfile';
import useFirebaseAuthState from '../../utils/useFirebaseAuthState';

// 모바일 전용 profile 페이지
function ProfilePage() {
  const router = useRouter();
  const user = useFirebaseAuthState();

  useEffect(() => {
    const resizeScreenHandler = () => {
      if (window.innerWidth > 768) {
        router.push('/');
      }
    };
    resizeScreenHandler();

    // 리사이즈 이벤트 추가
    window.addEventListener('resize', resizeScreenHandler);
    // 컴포넌트가 언마운트될 때 제거
    return () => {
      window.removeEventListener('resize', resizeScreenHandler);
    };
  }, [router]);

  return (
    <>
      {user ? (
        <UserProfile
          imageUrl={user?.photoURL}
          displayName={user?.displayName}
          email={user?.email}
        />
      ) : (
        <AuthForm />
      )}
    </>
  );
}

export default ProfilePage;
