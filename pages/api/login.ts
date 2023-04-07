import { serialize } from "cookie";
import { encode } from "@/lib/jwt";
import type {NextApiRequest, NextApiResponse} from "next";

/**
 * 로그인 하려는 정보가 올바른지 검증합니다.
 * @param email
 * @param password
 */
function authenticateUser(email: string, password: string): string | null {

  // 허가된 사용자는 1명 뿐입니다.
  const validEmail = 'devhoonse@gmail.com'; // 사용자 이메일
  const validPassword = 'strongpassword';   // 사용자 비밀번호

  // 허가된 사용자일 경우, 사용자 정보를 인코딩하여 반환합니다.
  if (email === validEmail && password === validPassword) {
    return encode({
      id: 'f678f078-fcfe-43ca-9d20-e8c9a95209b6',
      name: 'Hoonse',
      email
    });
  }

  // 허가된 사용자가 아닐 경우 null 을 반환합니다.
  return null;
}

/**
 * 사용자 로그인 요청을 처리합니다.
 * @param request
 * @param response
 */
export default function login(request: NextApiRequest, response: NextApiResponse) {

  // 요청 본문에서 필요한 항목들을 읽어옵니다.
  const {
    method,
    body: {
      email,
      password
    }
  } = request;

  // POST 외의 요청들은 처리하지 않습니다.
  if (method !== 'POST') return response.status(404).end();

  // email 또는 password 가 누락됬을 때에 응답입니다.
  if (!(email && password)) {
    return response.status(400).json({
      success: false,
      error: 'Missing Required Parameters. : email or password'
    });
  }

  // email 과 password 로 사용자가 실제 있는지 검증합니다.
  const user = authenticateUser(email, password);

  // 해당하는 사용자가 없을 때의 응답입니다.
  if (!user) {
    return response.status(401).json({
      success: false,
      error: 'Wrong Email or Password.'
    });
  }

  // 해당하는 사용자가 맞을 때의 응답입니다.
  response.setHeader('Set-Cookie', // 클라이언트에게 전달할 쿠키를 설정합니다.
    serialize(
      'my_auth', // 쿠키 이름입니다.
      user, // 직렬화할 데이터입니다.
      {
        path: '/', // todo: 의미 알아내기
        httpOnly: true // 서버 측에서만 쿠키를 읽을 수 있게 설정합니다. (브라우저에서 못 읽습니다.)
      }
    )
  );
  return response.status(200).json({
    success: true
  });
}
