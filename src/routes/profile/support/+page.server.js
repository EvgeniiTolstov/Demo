
/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        // TODO log the user in
        const origin = request.headers.get('origin');
        const referer = request.headers.get('referer');
       console.log('request', origin)
        const data = await request.formData();
        const email = data.get('email');
        if (!email) {
			return fail(400, { email, missing: true });
		}
        //переслать все данные из data на сервер
        const form = {};
        for (const [key, value] of data.entries()) {
            form[key] = value;

        }
        form.userid = cookies.get('userid')
        form.page ="Contact_page"
        form.refer = referer
        
        
        // отправить данные на сервер
        const response = await fetch(origin+'/api/v1/contact_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        const json = await response.json();
        const sendmail = `${origin}/api/mail/send/`
        const html = `<h1>Спасибо за заявку</h1> <p>Мы свяжемся с вами в ближайшее время</p>`
        const html2 = `<h1>На сайте заполненна форма обратной связи</h1> <p>Пользователь ${form.name} оставил заявку на сайте DZC</p> <p>Телефон: ${form.phone}</p> <p>Email: ${form.email}</p> <p>Страница с которой была отправлена заявка: <a href="https://xxx/about/contact">Контакты</a></p>`
        const subject = `Заявка с сайта`
        const to = form.email 
        const to2 = 'xxx@xxx.com'

        // отправить письмо клиенту
        const responseMail = await fetch(sendmail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({html, subject, to})
        });
        const jsonMail = await responseMail.json();
        // отправить письмо админу
        const responseMail2 = await fetch(sendmail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({html: html2, subject, to: to2})
        });
       
        return {  success: true }
    }
}