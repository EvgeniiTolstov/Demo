
/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const req = await request.formData()

   const origin = request.headers.get('origin')
        const url = `${origin}/api/auth/register/`
        console.log('url', req.get('password'))
        const email = req.get('email')
        const password = req.get('password')
        const username = req.get('email')
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, username })
        
    }
        )
        const signup = await res.json()
        if (signup.error) {
            return {
                status: 400,
                body: {
                    error: signup.error
                }
            }
        }

        const url2 = `${origin}/api/mail/send/`
        const html = `<b>Успешная регистрация</b><br><br>Ваш логин: ${email}<br>Ваш пароль: ${password}`
        const subject = 'Успешная регистрация'
        const to = email

        const res2 = await fetch(url2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ html, subject, to })
        })
        const data2 = await res2.json()
        if (data2.error) {
            return {
                status: 400,
                body: {
                    error: data2.error
                }
            }
        }

        cookies.set('userid', signup.data.user_id, { path: '/' })
        cookies.set('token', signup.data.token, { path: '/' })
        cookies.set('refresh_token', signup.data.refresh_token, { path: '/' })


        return {
            status: 200,
            body: {
                message: 'Пользователь успешно зарегистрирован'
            }
        }
    }  
    
    }

