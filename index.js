
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-Girjr4DRotpNCXKdGUcHHHSb",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

//create a simple express api that calls the function above.

const app = express()
app.use(bodyparser.json())
app.use(cors())

const port = 3080

app.post('/', async (req,res)=> {
    const {message, currentModel} = req.body;
    console.log(message,"message");
    console.log(currentModel,"currentModel");
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });

    // console.log(response.data.choices[0].text)
    res.json({
        // data: response.data
        message: response.data.choices[0].text
    })
});

app.get('/models', async (req,res)=> {
        const response = await openai.listEngines();
        console.log(response);
        res.json({
            models: response.data
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});