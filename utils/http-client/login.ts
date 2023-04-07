/**
 * 서버로 로그인 요청을 전송합니다.
 * @param email
 * @param password
 */
const handleLogin = async (email: string, password: string) => {
  const loginResponse = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const loginResponseData = await loginResponse.json();
  if (loginResponseData.success) return; // 로그인 요청이 성공했을 경우, 함수를 종료합니다.
  throw new Error(loginResponseData.error); // 로그인 실패 원인을 함수 호출부로 전달합니다.
};
export default handleLogin;
