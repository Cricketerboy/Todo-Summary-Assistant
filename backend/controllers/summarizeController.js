const supabase = require('../services/supabaseClient');
const { generateSummary } = require('../services/openaiService');
const { sendToSlack } = require('../services/slackService');

const summarizeTodos = async (req, res) => {
  const { data: todos, error } = await supabase.from('todos').select('title');
  if (error) return res.status(500).json({ error });

  let prompt = "Summarize the following to-dos:\n" + todos.map(t => `- ${t.title}`).join('\n');

  // Ensure 250+ characters
  while (prompt.length < 250) {
    prompt += '\n.';
  }

  try {
    const summary = await generateSummary(prompt);
    await sendToSlack(summary);
    res.json({ message: 'Summary sent to Slack', summary });
  } catch (err) {
    console.error('Summarize Error:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
};

module.exports = { summarizeTodos };
