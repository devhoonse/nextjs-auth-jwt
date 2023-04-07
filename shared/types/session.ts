import {MyAuth} from "@/shared/types/cookie";

/**
 * /api/get-session 요청에 대한 응답 구조입니다.
 * * loggedIn : 현재 사용자의 로그인 여부입니다.
 * * user : 쿠키 내에 my_auth 값을 디코딩하면 반환되는 정보 구조입니다.
 *          로그인 중이 아닐 경우에는 없는 필드입니다.
 */
export type GetSessionResponse = {
  loggedIn: boolean;
  user?: MyAuth;
};
