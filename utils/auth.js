exports.isAuthenticated = async (context) => {
  // Get cookies as objects
  const cookies = context.req.headers.cookie?.split('; ').reduce((prevValue, currentValue) => {
    const key = currentValue.split('=')[0];
    prevValue[key] = currentValue.split('=')[1];
    return prevValue;
  }, {});
  // Check if jwt cookie exist
  if (cookies?.jwt) {
    try {
      const response = await fetch('http://localhost:6060/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      const data = await response.json();
      if (data.status === 'error' || data.status === 'fail') {
        // If jwt is malformed
        return { status: false };
      }
      // Only if jwt is checked by server
      return { status: true, role: data.data?.user?.role, jwt: cookies.jwt };
    } catch (e) {
      console.log(e);
      return { status: false };
    }
  }
  return { status: false };
};
