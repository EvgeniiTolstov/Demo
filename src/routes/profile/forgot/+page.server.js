
import dotenv from 'dotenv'
dotenv.config()

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, fetch }) => {
        const req = await request.formData()
   const origin = request.headers.get('origin')
        const url = `${origin}/api/auth/forgot`
     
        const username = req.get('username')
     
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        
    }
        )
        const reset = await res.json()
        if (reset.error) {
            return {
                status: 400,
                body: {
                    error: reset.error
                }
            }
        }
        if (reset.token) {
       
        const token = reset.token
        console.log('token frontend', token)
        const url2 = `${origin}/api/mail/send`
        const html = `<b>Для сброса пароля перейдите по ссылке: <a href="${origin}/profile/forgot/?reset=${token}">ссылка</a></b>`
        const subject = 'Сброс пароля'
        const to = username

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
                    error: data2.error,
                    message: data2.error
                }
            }
        }
  

        return {
            status: 200,
            body: {
                message: 'Письмо c инструкцией по сбросу пароля отправлено на указанный email'
            }
        }
    }else{
        return {
            status: 404,
            body: {
                message: 'Пользователь не найден'
            }
        }
    }
    }  
    
    }
    export async function load({ url, fetch }) {
        const  reset  = url.searchParams.get('reset')
        const origin = url.origin

        if (reset) {
            
            const url = `${origin}/api/auth/forgot`
            const res = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reset })
            })
            const data = await res.json()
            if (data.error) {
                return {
                    status: 400,
                    body: {
                        reset: false,
                        error: data.error
                    }
                }
            }
            return {
                status: 200,
                body: {
                    reset: true,
                    email: data.email
                }
            }
       
  
    }
    return {
        status: 200,
        body: {
            reset:false
        }
    }
    }

