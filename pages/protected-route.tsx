import {useRouter} from "next/router";
import {useAuth} from "@/lib/hooks/useAuth";
import styles from '@/styles/app.module.css';

/**
 * 페이지 : /protected-route
 * @constructor
 */
function ProtectedRoutePage() {

  // 페이지 네비게이션 기능 이용을 위한 라우터를 가져옵니다.
  const router = useRouter();

  // 현재 컴포넌트에서 사용자 인증 관련 상태들을 사용합니다.
  const { loading, error, loggedIn } = useAuth();

  // 로그인 중이 아닐 경우, 로그인 페이지로 리다이렉션 시킵니다.
  if (!loading && !loggedIn) {
    router.push('/login');
    return null;
  }

  // 페이지 컴포넌트 구조
  return (
    <div className={styles.container}>
      {loading && <h1>Loading...</h1>}
      {error && (
        <>
          <h1>An Error Occurred.</h1>
          <p>{error.message}</p>
        </>
      )}
      {loggedIn && (
        <>
          <h1>Protected Route</h1>
          <p>You can&apos;t see me if not logged-in!</p>
        </>
      )}
    </div>
  );
}
export default ProtectedRoutePage;
