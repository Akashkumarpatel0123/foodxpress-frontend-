const handleGoogleLogin = async () => {
	try {
	  const result = await signInWithPopup(auth, provider);
	  const user = result.user;
	  const idToken = await user.getIdToken(); // ✅ Secure ID token
    
	  const res = await axios.post('http://localhost:5000/api/auth/google-login', {
	    token: idToken,
	  });
    
	  console.log("Backend response:", res.data);
	  // Save to localStorage or Context
	} catch (error) {
	  console.error("Google login failed:", error);
	}
    };
    