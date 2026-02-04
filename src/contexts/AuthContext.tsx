"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserProfile | null;
    login: (email: string, name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);

    // Initial check for persisted session
    useEffect(() => {
        const storedUser = localStorage.getItem('cosmic_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(parsedUser);
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Failed to parse user session", e);
                localStorage.removeItem('cosmic_user');
            }
        }
    }, []);

    const login = (email: string, name: string) => {
        const newUser = { email, name };
        setUser(newUser);
        setIsLoggedIn(true);
        localStorage.setItem('cosmic_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('cosmic_user');
        window.location.href = '/'; // Hard redirect to clear any sensitive state
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
