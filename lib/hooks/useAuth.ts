import {useEffect, useState} from "react";
import {GetSessionResponse} from "@/shared/types/session";

/**
 * 호출하는 컴포넌트 측에서 사용자 인증 관련 상태들을 사용하도록 만듭니다.
 */
export function useAuth() {

  // 사용자 로그인 상태를 관리합니다.
  const [loggedIn, setLoggedIn] = useState<GetSessionResponse['loggedIn']>(false);
  const [user, setUser] = useState<GetSessionResponse['user'] | null>(null);

  // HTTP API 요청 상태를 관리합니다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 컴포넌트가 처음 마운트될 때에 실행할 동작입니다.
  useEffect(() => {
    setLoading(true);
    fetch('/api/get-session') // 현재 사용자의 로그인 여부 확인을 요청합니다.
      .then(response => response.json())
      .then((data: GetSessionResponse) => {
        if (data.loggedIn) { // 로그인 중일 경우에만 클라이언트 상태를 업데이트 합니다.
          setLoggedIn(true);
          setUser(data.user);
        }
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // 현재 사용자 로그인 관련 상태 참조들을 반환합니다.
  return {
    loggedIn,
    user,
    loading,
    error
  };
}
