import jwt from 'jsonwebtoken';

/**
 * JWT 토큰 발행 시 서명에 사용할 비밀 키입니다.
 */
const JWT_SECRET = process.env.JWT_SECRET || 'if-not-found'; // 실무에선 절대 이렇게 하지 마세요!

export function encode(payload: Record<string, string | number>) {
  return jwt.sign(payload, JWT_SECRET);
}

export function decode(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
