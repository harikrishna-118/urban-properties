import { useEffect, useState } from "react";

const SAVED_KEY = "urban-properties-wishlist-v1";
const RECENT_KEY = "urban-properties-recent-v1";
const CHANGE_EVENT = "urban-properties-storage-changed";

const isBrowser = () => typeof window !== "undefined";

const read = (key) => {
  if (!isBrowser()) return [];

  try {
    const value = JSON.parse(
      window.localStorage.getItem(key) || "[]"
    );

    return Array.isArray(value)
      ? value.filter((id) => typeof id === "string")
      : [];
  } catch {
    return [];
  }
};

const publish = () => {
  if (isBrowser()) {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
};

const save = (key, values) => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(values));
  } catch {
    // Storage may be blocked.
  }

  publish();
};

export const getWishlist = () => read(SAVED_KEY);
export const getRecentlyViewed = () => read(RECENT_KEY);

export function toggleWishlist(id) {
  const current = getWishlist();

  save(
    SAVED_KEY,
    current.includes(id)
      ? current.filter((item) => item !== id)
      : [id, ...current]
  );
}

export function removeWishlist(id) {
  save(
    SAVED_KEY,
    getWishlist().filter((item) => item !== id)
  );
}

export function clearWishlist() {
  save(SAVED_KEY, []);
}

export function recordRecentlyViewed(id) {
  if (!id) return;

  save(
    RECENT_KEY,
    [
      id,
      ...getRecentlyViewed().filter((item) => item !== id),
    ].slice(0, 10)
  );
}

export function clearRecentlyViewed() {
  save(RECENT_KEY, []);
}

export function usePropertyCollections() {
  const [savedIds, setSavedIds] = useState(getWishlist);
  const [recentIds, setRecentIds] = useState(getRecentlyViewed);

  useEffect(() => {
    const refresh = () => {
      setSavedIds(getWishlist());
      setRecentIds(getRecentlyViewed());
    };

    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return {
    savedIds,
    recentIds,
    toggleWishlist,
    removeWishlist,
    clearWishlist,
    recordRecentlyViewed,
    clearRecentlyViewed,
  };
}