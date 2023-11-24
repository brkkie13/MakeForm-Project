import axios from 'axios';
import { NextResponse } from 'next/server';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

// 유저가 폼 답변 제출
export async function POST(req) {
  try {
    const { formId, header, submissionDate, responses } = await req.json();
    console.log(formId, header, submissionDate, responses);

    const submittedResponses = await instance.get('/submittedResponses');
    const data = submittedResponses.data;

    const existingFormResponses = data.find(
      responses => responses.id === formId
    );

    if (!existingFormResponses) {
      const res = await instance.post('/submittedResponses', {
        id: formId,
        header,
        responsesList: [{ submissionDate, responses }],
      });
    }

    if (existingFormResponses) {
      existingFormResponses.responsesList.push({ submissionDate, responses });

      const res = await instance.put(
        `/submittedResponses/${formId}`,
        existingFormResponses
      );

      if (res.error) {
        throw new Error(res.error);
      }
    }

    return NextResponse.json({
      message: '성공적으로 제출했습니다',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: '제출에 실패했습니다',
      status: 500,
    });
  }
}
