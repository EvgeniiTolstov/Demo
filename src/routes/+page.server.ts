export async function load({fetch}) {
    const section = `/api/v1/section`
    const resSection = await fetch(section)
    const datasection = await resSection.json()
    return {
        sections: datasection,
       
    }
}

/** @type {import('./$types').Actions} */
export const actions = {

    async contact_form({ request, url, fetch, params, cookies }) {
        const origin = request.headers.get('origin');
        const referer = request.headers.get('referer');
      
        const data = await request.formData();
        const email = data.get('email');
        if (!email) {
			return fail(400, { email, missing: true });
		}

        const form = {};
        for (const [key, value] of data.entries()) {
            form[key] = value;

        }
        form.userid = cookies.get('userid')
        form.page ="home_page"
        form.refer = referer
        form.message = "Заказ обратного звонка с главной страницы сайта"
        
        const response = await fetch(origin+'/api/v1/contact_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        const json = await response.json();
        if (!response.ok) {
            return fail(response.status, json);
        }
        

        
       
        return {  success: true, json };

    }
}