import {UserInfo} from "@/shared/types/user";

/**
 * 쿠키 내에 my_auth 값을 디코딩하면 반환되는 정보 구조입니다.
 * * iat : JWT 서명 결과 기록되는 발행일자 값입니다.
 */
export type MyAuth = UserInfo & {
  iat: number;
}
