export const checkAdminLogin = async (email: string, password: string): Promise<string | null> => {
  try {
    const response = await fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return null;
    }

    const { userId } = await response.json();
    return userId || null;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};