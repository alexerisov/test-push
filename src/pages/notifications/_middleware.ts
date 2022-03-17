import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { CHEF_TYPE } from '@/utils/constants';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect('/');
  }
  return NextResponse.next();
}
