import { NextResponse,NextRequest } from 'next/server';
import { getAvailableThemes } from '@/utils/getThemes';

export async function GET(req:NextRequest) {
  try {
    const template = await req.json();
    const themes = getAvailableThemes(template);
    return NextResponse.json({ themes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in /api/templates:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}