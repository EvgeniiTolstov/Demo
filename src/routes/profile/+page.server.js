import dotenv from 'dotenv'
dotenv.config()

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const req = await request.formData()
    const token = cookies.get('token');
    const name = req.get('name');
    const inn = req.get('inn');
    const email = req.get('email');
    const phone = req.get('phone');   
    const origin = request.headers.get('origin')
    const url = `${origin}/api/profile/`
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            name,
            inn,
            email,
            phone,
            token
        })
    })
    const data = await res.json()
    
    return {
        status: 200,
        body: data

}
}
}
    