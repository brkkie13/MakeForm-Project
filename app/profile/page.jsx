'use client';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/modals/AuthForm';
import UserProfile from '../../components/user/UserProfile';
import Section from '../../components/ui/Section';
import useFirebaseAuthState from '../../utils/useFirebaseAuthState';
import useWindowWidth from '../../utils/useWindowWidth';
import { SectionCard } from '../../components/ui/SectionCard';

function ProfilePage() {
  const router = useRouter();
  const user = useFirebaseAuthState();
  const windowWidth = useWindowWidth(); // 모바일 너비일 때 회원가입 폼이 보이고, pc너비이면 회원가입 폼이 보이지 않음 (팝업창으로 보임)

  return (
    <Section>
      <SectionCard>
        {user ? (
          <UserProfile
            imageUrl={user?.photoURL}
            displayName={user?.displayName}
            email={user?.email}
            emailVerified={user?.emailVerified}
          />
        ) : windowWidth <= 768 ? (
          <AuthForm />
        ) : (
          router.push('/')
        )}
      </SectionCard>
    </Section>
  );
}

export default ProfilePage;
