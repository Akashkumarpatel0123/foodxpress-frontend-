import { createContext, useContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPhoto = localStorage.getItem("userPhoto");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.warn("Invalid user data in localStorage");
        localStorage.removeItem("user");
      }
    }

    if (storedPhoto) {
      setUserPhoto(storedPhoto);
    }
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Save photo to localStorage
  useEffect(() => {
    if (userPhoto) {
      localStorage.setItem("userPhoto", userPhoto);
    } else {
      localStorage.removeItem("userPhoto");
    }
  }, [userPhoto]);

  // Update user profile (merge with existing)
  const updateUserProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  // Update user photo
  const updateUserPhoto = (photo) => {
    setUserPhoto(photo);
  };

  // Logout / clear user data
  const logout = () => {
    setUser(null);
    setUserPhoto(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userPhoto");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        updateUserProfile,
        userPhoto,
        updateUserPhoto,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
