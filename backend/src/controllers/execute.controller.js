const executeService = require('../services/execute.service');

const executeCode = async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ 
      status: 'error', 
      error: 'Both language and code are required' 
    });
  }

  try {
    const result = await executeService.runCode(language, code);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      error: 'Internal server error during code execution' 
    });
  }
};

module.exports = { executeCode };