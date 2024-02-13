import { json } from '@sveltejs/kit';
import  Cookie  from 'cookie';
export async function GET(event) {
   // удалине куки
    const cookies = event.request.headers.get('cookie')
    const token = Cookie.parse(cookies).token
    const refresh_token = Cookie.parse(cookies).refresh_token
    const cookieToken = Cookie.serialize('token', token, {
        maxAge: -1,
        path: '/'
    });
    const cookieRrfresh = Cookie.serialize('refresh_token', refresh_token, {
        maxAge: -1,
        path: '/'
    });
    const cookieUserid = Cookie.serialize('userid', '', {
        maxAge: -1,
        path: '/'
    });
    return json({
       data : 'ok'
    }, {
        headers: {
            'set-cookie': [cookieToken, cookieRrfresh, cookieUserid]
        }
    });
}
