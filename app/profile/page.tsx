'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@components/user/AuthForm';
import UserProfile from '@components/user/UserProfile';
import { Section, SectionCard } from '@components/ui/Section';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import useWindowWidth from '@utils/useWindowWidth';
import { User } from 'firebase/auth';

// code
function ProfilePage() {
  const router = useRouter();
  const user = useFirebaseAuthState();
  const windowWidth: number = useWindowWidth() || 0; // 화면 너비가 1000px 이하일 때 '/profile' 페이지에서 로그인 폼이 보이고, 초과하면 회원가입 폼이 보이지 않고 모달창으로 보임.

  useEffect(() => {
    if (!user && windowWidth > 1000) {
      router.push('/');
    }
  }, [user, windowWidth, router]);

  return (
    <Section>
      <SectionCard>
        {user ? (
          <UserProfile
            imageUrl={user?.photoURL}
            displayName={user?.displayName}
            email={user.email}
            emailVerified={user.emailVerified}
          />
        ) : windowWidth <= 1000 ? (
          <AuthForm />
        ) : null}
      </SectionCard>
    </Section>
  );
}

export default ProfilePage;
