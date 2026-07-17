import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


app.post("/chat", async (req, res) => {

    try {

        const message = req.body.message;

        const response = await client.responses.create({

            model: "gpt-5.5-mini",

            input: [
                {
                    role: "system",
                    content:
                    "Je bent ORION, een persoonlijke AI-orchestrator. Help de gebruiker duidelijk en praktisch."
                },
                {
                    role: "user",
                    content: message
                }
            ]

        });


        res.json({
            answer: response.output_text
        });


    } catch(error) {

        res.json({
            answer: "ORION heeft een verbindingsprobleem."
        });

    }

});


app.get("/", (req,res)=>{
    res.send("ORION AI core actief");
});


app.listen(3000, ()=>{

    console.log(
        "ORION AI server gestart"
    );

});
