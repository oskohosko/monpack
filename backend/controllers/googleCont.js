// Controller for our google services
require('dotenv').config();
const fs = require('fs')
const { Translate } = require('@google-cloud/translate').v2;
const textToSpeech = require("@google-cloud/text-to-speech");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

// Creating a TTS client
const client = new textToSpeech.TextToSpeechClient();

module.exports = {
    // Method to handle translating
    // Takes the text and target language as input
    translate: async (text, targetLanguage) => {
        // Now trying to translate it and return in json format
        const apiKey = process.env.GOOGLE_API_KEY;
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        console.log(3)

        try {
            const response = await axios.post(url, {
                q: text,
                target: targetLanguage,
            });

            const translation = response.data.data.translations[0].translatedText;
            return { translatedText: translation };
        } catch (error) {
            console.error('Error translating text:', error.response ? error.response.data : error.message);
            return { error: 'Translation failed' };
        }
    },
    // Handles our text to speech
    toSpeech: async (text) => {
        // Constructing request
        const request = {
            input: { text: text },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" }
        };

        // Now performing the request
        client.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }

            fs.writeFile("output.mp3", response.audioContent, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });

            fs.readFile("output.mp3", (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }
    
                // Send the file data as a binary buffer
                return data;
            });


        })
    },

    genAI: async (text) => {
        // API Key
        const apiKey = process.env.GOOGLE_API_KEY;

        const googleAI = new GoogleGenerativeAI(apiKey);
        const geminiConfig = {
            temperature: 0.9,
            topP: 1,
            topK: 1,
            maxOutputTokens: 4096
        };

        const geminiModel = googleAI.getGenerativeModel({
            model: "gemini-pro",
            geminiConfig,
        });

        const result = await geminiModel.generateContent(
            `Please give me an approximate distance from ${text} to Melbourne.
             Answer in the form {distance}km.`
        )

        return result.response.text()
    }
}