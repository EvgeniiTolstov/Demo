
/** @type {import('@sveltejs/kit').Load} */
export async function load({url,cookies, fetch }) {

  const origin = url.origin
  const token = cookies.get('token')
  const refresh_token = cookies.get('refresh_token')

  const apiAuthUrl = `${origin}/api/auth`
  const response = await fetch(apiAuthUrl, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': String(token),
          'refresh_token': String(refresh_token),

      }
  })
    const user = await response.json()

    if (response.status === 401) {
        return {
          findUser : {
            username: false,
          },
          error : user.error,
          user_id: user.user_id,
          userid_cookies: cookies.get('userid'),
         
        };
    }
    else{
      const  refresh_token = user.findUser.refresh_token
      if(user.token){
      const token = user.token
     
        cookies.set('token', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
      })

      cookies.set('refresh_token', refresh_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
      })

    }
    }


    return user
    
  }
  