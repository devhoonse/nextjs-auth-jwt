import {useState} from "react";
import type {FormEventHandler} from "react";
import {useRouter} from "next/router";
import handleLogin from "@/utils/http-client/login";
import {useAuth} from "@/lib/hooks/useAuth";
import styles from '@/styles/app.module.css';

/**
 * 페이지 : /login
 * @constructor
 */
function LoginPage() {

  // 페이지 네비게이션 기능 이용을 위한 라우터를 가져옵니다.
  const router = useRouter();

  // 현재 컴포넌트에서 사용자 인증 관련 상태들을 사용합니다.
  const { loading, error, loggedIn } = useAuth();

  // 로그인 양식의 입력 값 상태를 기록합니다.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 중 발생한 에러 상태를 기록합니다.
  const [loginError, setLoginError] = useState<Error | null>(null);

  /**
   * 로그인 버튼 클릭 (양식 제출) 시 동작입니다.
   * @param event
   */
  const handleSubmit:  FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setLoginError(null);
    handleLogin(email, password)
      .then(() => router.push('/protected-route')) // 로그인 성공 시, 프라이빗 페이지로 이동시킵니다.
      .catch(error => setLoginError(error));
  };

  // 이미 로그인 중인 경우, 개인 페이지로 리다이렉션 시킵니다.
  if (!loading && loggedIn) {
    router.push('/protected-route');
    return null;
  }

  // 페이지 컴포넌트 구조입니다.
  return (
    <div className={styles.container}>
      {loading && <h1>Loading...</h1>}
      {!loggedIn && (
        <>
          <h1>Login</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email :
              <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)}/>
            </label>
            <label htmlFor="password">
              Password :
              <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)}/>
            </label>
            <button type="submit">
              Login
            </button>
            {loginError && (
              <div className={styles.formError}>
                {loginError.message}
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}
export default LoginPage;
