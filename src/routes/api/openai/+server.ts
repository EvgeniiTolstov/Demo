
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(event){
    
  
      const openai = new OpenAIApi(configuration);
      const req = await event.request.json()
      const prompt = req.prompt;
      console.log('prompt', openai)
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
      });
      console.log(completion.data.choices[0].text);
      return new Response(JSON.stringify(completion.data.choices[0].text), {
        headers: { 'content-type': 'application/json' },
    })
}
