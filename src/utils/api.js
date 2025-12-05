/**
 * Formats a phone number to E.164 format (+1xxxxxxxxxx) assuming US if no country code.
 * Strips all non-numeric characters.
 * 
 * @param {string} phone - The raw phone string
 * @returns {string} - The formatted phone string
 */
function formatPhoneNumber(phone) {
  if (!phone) return phone;
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 1 and is 11 digits, assume it's already got country code
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  
  // If it's 10 digits, assume US and prepend +1
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  
  // Fallback: just return the + and numbers if it doesn't match standard US patterns
  // or let downstream handle validation if it's too short/long
  return `+${cleaned}`;
}

/**
 * Utility function to send data to the backend.
 * 
 * @param {Object} data - The data to send (e.g., { phone: '...', email: '...' })
 * @returns {Promise<Object>} - The JSON response from the webhook
 */
export async function submitToN8n(data) {
  // 🛡️ SECURITY UPGRADE: 
  // If you deploy a serverless function (e.g. on Vercel/Netlify), change this to '/api/submit'.
  // This keeps the actual n8n URL hidden from the client browser.
  // For now, we fall back to the direct URL if no API proxy is found.
  
  // const API_ENDPOINT = '/api/submit'; // UNCOMMENT THIS when you deploy the proxy
  // const API_ENDPOINT = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://connorenosi.app.n8n.cloud/webhook/local-host-website-to-trigger-call';
  
  // Use correct webhook based on source
  let API_ENDPOINT;
  
  if (data.source === 'action_modal_qualification') {
    API_ENDPOINT = 'https://connorenosi.app.n8n.cloud/webhook/get-your-custom-agent-built';
  } else {
    // Default fallback for phone calls and other sources
    API_ENDPOINT = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://connorenosi.app.n8n.cloud/webhook/local-host-website-to-trigger-call';
  }

  // ... rest of formatting logic ...
  
  // Clone data to avoid mutating original object
  const payload = { ...data };
  
  // ... formatting ...
  if (payload.phone) payload.phone = formatPhoneNumber(payload.phone);
  if (payload.email) payload.email = payload.email.trim();

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Attempt to parse JSON, but handle if the webhook returns plain text
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  } catch (error) {
    console.error('Failed to submit to n8n:', error);
    throw error;
  }
}

