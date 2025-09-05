import { NextResponse } from 'next/server';
import { getAvailableTemplates } from '@/utils/getTemplates';

export async function GET() {
  try {
    const templates = getAvailableTemplates();
    return NextResponse.json({ templates });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in /api/templates:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}