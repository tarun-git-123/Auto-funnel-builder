import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import config from '../../../config.json';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { allFormValues } = body;

        const bodyParams = new URLSearchParams({
            ...allFormValues,
            loginId: process.env.CRM_USERNAME!,
            password: process.env.CRM_PASSWORD!,
            campaignId: config.campaignId
        }).toString();

        console.log(bodyParams);


        const response = await axios.post(`${process.env.CRM_ENDPOINT!}`,
            bodyParams,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
