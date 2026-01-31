// utils/notification-storage.ts

type UserIdentifier = { id?: string; email?: string } | null;

/**
 * Generate storage key berdasarkan user
 */
export const getReadMapKey = (user: UserIdentifier): string => {
  if (user?.id) return `notif_read:${user.id}`;
  if (user?.email) return `notif_read:${user.email}`;
  return 'notif_read:guest';
};

/**
 * Load readMap dari localStorage
 */
export const loadReadMap = (user: UserIdentifier): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(getReadMapKey(user));
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

/**
 * Save readMap ke localStorage
 */
export const saveReadMap = (
  user: UserIdentifier,
  readMap: Record<string, boolean>
): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getReadMapKey(user), JSON.stringify(readMap));
  } catch {
    // Silent fail for localStorage errors
  }
};
