export const fetchAccessToken = async (username: string, password: string): Promise<string | null> => {
	try {
	  const response = await fetch('https://your-api-url.com/access', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
	  });
  
	  if (!response.ok) {
		throw new Error('Failed to fetch access token');
	  }
  
	  const data = await response.json();
	  return data.token; // Adjust according to your API response structure
	} catch (error) {
	  console.error('Error fetching access token:', error);
	  return null;
	}
  };
  