const axios = require('axios');

async function sendToSlack(summaryText) {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: summaryText,
  });
}

module.exports = { sendToSlack };
