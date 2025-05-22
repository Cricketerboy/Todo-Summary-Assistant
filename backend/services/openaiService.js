const axios = require('axios');

async function generateSummary(prompt) {
  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/summarize',
      {
        text: prompt,
        length: "medium",
        format: "paragraph",
        model: "command",
        extractiveness: "low",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.summary;
  } catch (error) {
    console.error('Cohere Error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { generateSummary };
