const handleLogin = (credentialResponse) => {
  const token = credentialResponse.credential;
  post("/api/login", { token }).then((user) => {
    setUserId(user._id);  // Make sure this is being set
    console.log(`Logged in as ${user.name}`);
  });
}; 