"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setUser as setUserDB, getUserByEmail, type User } from '@/lib/db';

interface UserProfile {
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserProfile | null;
    login: (email: string, password?: string) => Promise<void>;
    signup: (user: User) => Promise<void>;
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
                setUser(parsedUser);
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Failed to parse user session", e);
                localStorage.removeItem('cosmic_user');
            }
        }
    }, []);

    const login = async (email: string, password?: string) => {
        if (!email) throw new Error("Email required");

        // 1. Check DB for user
        const dbUser = await getUserByEmail(email);

        if (dbUser) {
            if (password && dbUser.password && dbUser.password !== password) {
                throw new Error("Password mismatch");
            }

            const userProfile: UserProfile = {
                name: dbUser.name,
                email: dbUser.email,
                avatar: undefined // Can expand later
            };

            setUser(userProfile);
            setIsLoggedIn(true);
            localStorage.setItem('cosmic_user', JSON.stringify(userProfile));
        } else {
            // Fallback for demo if user not found (or throw error)
            // For this specific request, we want strict adherence to "signed up name"
            throw new Error("User not found");
        }
    };

    const signup = async (userData: User) => {
        // 1. Check for duplicates
        const existingUser = await getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error("이미 가입된 이메일입니다.");
        }

        // 2. Save to DB
        await setUserDB(userData);

        const userProfile: UserProfile = {
            name: userData.name,
            email: userData.email,
        };

        setUser(userProfile);
        setIsLoggedIn(true);
        localStorage.setItem('cosmic_user', JSON.stringify(userProfile));
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('cosmic_user');
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
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
