import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {fireBaseApp} from "../../../../config/firebaseweb.config";

// Initialize Firebase authentication
const auth = getAuth(fireBaseApp);

export function useAuthentication() {
    // Initialize user state with null
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        // Listen for authentication state changes
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                // If user is signed in, update the user state
                setUser(user);
            } else {
                // If user is signed out, set user state to undefined
                setUser(undefined);
            }
        });
    }, []);

    // Return user state
    return {
        user
    };
}
