import { createSessionCookie } from '@/firebase/auth/actions';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { idToken } = await request.json();

  if (!idToken) {
    return NextResponse.json({ error: 'idToken is required' }, { status: 400 });
  }

  const result = await createSessionCookie(idToken);

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }
}
