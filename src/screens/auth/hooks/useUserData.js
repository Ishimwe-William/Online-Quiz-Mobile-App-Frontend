import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [refresh, setRefresh] = useState(false); // State variable for refreshing data
    const [loading, setLoading] = useState(true); // State variable for loading indicator

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString !== null) {
                    const userData = JSON.parse(userDataString);
                    setUserData(userData); // Update userData state with parsed data
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            } finally {
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };

        getUserData();

        // Refresh data automatically every 0.5 seconds
        const intervalId = setInterval(() => {
            setRefresh(prevState => !prevState);
        }, 500);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [refresh]); // Include refresh in the dependency array

    return { userData, loading };
};
