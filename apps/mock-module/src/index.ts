/**
 * This is a Mock Module that simulates an external service.
 * It uses the 'axios' library to communicate with the Core Engine API.
 */

const CORE_API_URL = 'http://localhost:3001/api';

/**
 * This object is our "Module Manifest".
 * It tells the Core Engine: 
 * 1. Who I am (name/id)
 * 2. What tools I provide (capabilities)
 * 3. What inputs those tools need (parameters_schema)
 */
const mockModule = {
  id: 'mock-file-tool-001',
  name: 'Mock File Tool',
  capabilities: [
    {
      name: 'Compress File',
      input_types: ['VIDEO', 'IMAGE'], // This tool handles videos and images
      parameters_schema: {
        type: 'object',
        properties: {
          quality: { type: 'number', minimum: 1, maximum: 100 },
          format: { type: 'string', enum: ['mp4', 'webm', 'jpg', 'png'] },
        },
        required: ['quality'], // 'quality' is a mandatory setting for this tool
      },
    },
    {
      name: 'Get Metadata',
      input_types: ['VIDEO', 'IMAGE', 'DOCUMENT'],
      parameters_schema: {
        type: 'object',
        properties: {
          deep_scan: { type: 'boolean' },
        },
      },
    },
  ],
};

/**
 * Function to send this manifest to the Core Engine.
 */
async function register() {
  try {
    console.log(`[Mock Module] Attempting to register: ${mockModule.name}...`);
    
    // We send a POST request to the /modules/register endpoint
    const response = await axios.post(`${CORE_API_URL}/modules/register`, mockModule);
    
    console.log('[Mock Module] Registration successful!');
    console.log('[Mock Module] Core Response:', response.data);
  } catch (error: any) {
    // If the Core Engine is not running or there's a validation error, we log it.
    console.error('[Mock Module] Registration failed!');
    console.error('[Mock Module] Error:', error.response?.data || error.message);
  }
}

// Start the registration process
register();
