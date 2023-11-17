import axios from 'axios';
import { NextResponse } from 'next/server';
import { hashPassword } from '../../../utils/password';
import { validateEmail, validatePassword } from '../../../utils/validation';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

// 회원가입
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 입력값이 정규표현식 조건에 안맞을 때
    const validate1 = validateEmail(email);
    const validate2 = validatePassword(password);
    if (!validate1 || !validate2) {
      return NextResponse.json({
        error: '입력한 정보를 다시 한번 확인해주세요.',
        status: 400,
      });
    }

    // 유저가 이미 존재할 때
    const users = await instance.get('/users');
    const isUserExist = users.data.find(user => user.email === email);
    console.log(isUserExist);
    if (isUserExist) {
      return NextResponse.json({
        error: '해당 이메일은 이미 등록되어 있습니다.',
        status: 400,
      });
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);
    const newUser = { email, password: hashedPassword };

    // db 저장
    const res = await instance.post('/users', newUser);

    // 서버 이상에 대한 에러처리
    if (res.error) {
      return NextResponse.json({
        error: '회원가입에 실패했습니다.',
        status: 500,
      });
    }

    return NextResponse.json({
      message: '회원가입에 성공했습니다.',
      success: true,
      newUser,
    });
  } catch (error) {
    return NextResponse.json({
      error: '회원가입에 실패했습니다.',
      status: 500,
    });
  }
}
