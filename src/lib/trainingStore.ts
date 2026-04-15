import { get, set, update } from 'idb-keyval';

export interface UserProgress {
    currentDay: number;
    completedDays: number[];
    totalPositiveEnergy: number;
    lastUpdated: number;
}

const STORAGE_KEY = 'imagination-training-progress';

const DEFAULT_PROGRESS: UserProgress = {
    currentDay: 1,
    completedDays: [],
    totalPositiveEnergy: 0,
    lastUpdated: Date.now()
};

export const getProgress = async (): Promise<UserProgress> => {
    try {
        const data = await get(STORAGE_KEY);
        return data || DEFAULT_PROGRESS;
    } catch (error) {
        console.error('Failed to get progress:', error);
        return DEFAULT_PROGRESS;
    }
};

export const completeDay = async (day: number, energyEarned: number = 100) => {
    try {
        await update(STORAGE_KEY, (val: UserProgress | undefined) => {
            const data = val || DEFAULT_PROGRESS;
            if (!data.completedDays.includes(day)) {
                data.completedDays = [...data.completedDays, day].sort((a, b) => a - b);
                data.totalPositiveEnergy += energyEarned;
                // If it's the current max day, unlock next
                if (day === data.currentDay && data.currentDay < 30) {
                    data.currentDay += 1;
                }
            }
            data.lastUpdated = Date.now();
            return data;
        });
    } catch (error) {
        console.error('Failed to update progress:', error);
    }
};

export const resetProgress = async () => {
    await set(STORAGE_KEY, DEFAULT_PROGRESS);
};
