import axios from 'axios';
import { NextResponse } from 'next/server';
import { hashPassword } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 입력된 값 유효성 검사 - 클라이언트 에러
    if (!email.includes('@') || password.trim().length < 7) {
      return NextResponse.json(
        { error: '입력된 값이 유효하지 않습니다' },
        { status: 422 }
      );
    }

    // 유저가 이미 존재하는지 확인(존재한다면 해당이메일로 가입할 수 없음) - 클라이언트 에러

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);
    const newUser = { email, password: hashedPassword };

    // db 저장
    const res = await axios.post('http://localhost:4000/users', newUser);

    // 서버 이상에 대한 에러처리
    if (res.error) {
      return NextResponse.json({ error: '유저 생성 실패' }, { status: 500 });
    }

    return NextResponse.json({
      message: '유저 생성 성공',
      success: true,
      newUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
