import type {NextApiRequest, NextApiResponse} from "next";
import {parse} from "cookie";
import {decode} from "@/lib/jwt";

/**
 *
 * @param request
 * @param response
 */
export default function getSession(request: NextApiRequest, response: NextApiResponse) {

  // 요청 본문에서 필요한 항목들을 읽어옵니다.
  const {
    method,
    headers: {
      cookie
    }
  } = request;

  // GET 외의 요청들은 처리하지 않습니다.
  if (method !== 'GET') {
    return response.status(404).end();
  }

  // 쿠키에서 my_auth 라는 이름의 값을 찾습니다.
  const { my_auth } = parse(cookie || '');

  // 쿠키에서 my_auth 라는 이름의 값을 찾지 못한 경우, 로그인 상태가 아니라고 응답합니다.
  if (!my_auth) {
    return response.json({
      loggedIn: false
    });
  }

  // 쿠키에서 my_auth 라는 이름의 값이 있는 경우, 포함된 payload 를 파싱해서 응답합니다.
  return response.json({
    loggedIn: true,
    user: decode(my_auth)
  });
}
