import { v4 as uuidv4 } from 'uuid';
export const USER_ID_KEY = 'USER_ID';
export async function getUniqueId() {
    const storedUserId = await getUserId();
    if (storedUserId) {
        return storedUserId;
    }
    const newUserId = uuidv4();
    await setUserId(newUserId);
    return newUserId;
}
async function getUserId() {
    try {
        const stored = await chrome.storage.local.get(USER_ID_KEY);
        const userId = stored[USER_ID_KEY];
        return typeof userId === 'string' ? userId : null;
    }
    catch {
        return window.localStorage.getItem(USER_ID_KEY);
    }
}
async function setUserId(userId) {
    try {
        await chrome.storage.local.set({ [USER_ID_KEY]: userId });
    }
    catch {
        window.localStorage.setItem(USER_ID_KEY, userId);
    }
}
//# sourceMappingURL=getUniqueId.web.js.map