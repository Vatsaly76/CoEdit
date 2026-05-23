const Docker = require('dockerode');
const docker = new Docker();

class ExecuteService {
  async runCode(language, code) {
    const imageMap = {
      javascript: { 
        image: 'node:18-alpine', 
        cmd: ['node', '-e', code] 
      },
      python: { 
        image: 'python:3.10-alpine', 
        cmd: ['python', '-c', code] 
      }
    };

    const config = imageMap[language.toLowerCase()];

    if (!config) {
      throw new Error(`Execution for language '${language}' is not supported.`);
    }

    try {
      const container = await docker.createContainer({
        Image: config.image,
        Cmd: config.cmd,
        Tty: false,
        HostConfig: {
          AutoRemove: true,
          Memory: 128 * 1024 * 1024,
          NetworkMode: 'none',
        }
      });

      const stream = await container.attach({ 
        stream: true, 
        stdout: true, 
        stderr: true 
      });

      let output = '';
      stream.on('data', (chunk) => {
        output += chunk.slice(8).toString('utf-8');
      });

      await container.start();
      await container.wait();

      return { 
        status: 'success', 
        output: output.trim() || 'No output' 
      };

    } catch (error) {
      if (error.statusCode === 404) {
        return { 
          status: 'error', 
          error: `Docker image '${config.image}' not found.` 
        };
      }

      return { 
        status: 'error', 
        error: error.message 
      };
    }
  }
}

module.exports = new ExecuteService();