
import { useEffect, useState } from "react";

const KEY = "urban-properties-compare-v1";
const EVENT = "urban-properties-compare-change";
const LIMIT = 4;

export function getComparedIds() {
  if (typeof window === "undefined") return [];

  try {
    const ids = JSON.parse(
      localStorage.getItem(KEY) || "[]"
    );

    return Array.isArray(ids)
      ? ids
          .filter((id) => typeof id === "string")
          .slice(0, LIMIT)
      : [];
  } catch {
    return [];
  }
}

function save(ids) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // Storage may be disabled.
  }

  window.dispatchEvent(new Event(EVENT));
}

export function toggleCompare(id) {
  const key = String(id);
  const ids = getComparedIds();

  if (ids.includes(key)) {
    save(ids.filter((item) => item !== key));
    return true;
  }

  if (ids.length >= LIMIT) return false;

  save([...ids, key]);
  return true;
}

export function removeCompare(id) {
  save(
    getComparedIds().filter(
      (item) => item !== String(id)
    )
  );
}

export function clearCompare() {
  save([]);
}

export function useCompare() {
  const [comparedIds, setComparedIds] =
    useState(getComparedIds);

  useEffect(() => {
    const refresh = () =>
      setComparedIds(getComparedIds());

    const storage = (event) => {
      if (event.key === KEY) refresh();
    };

    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", storage);

    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener("storage", storage);
    };
  }, []);

  return {
    comparedIds,
    toggleCompare,
    removeCompare,
    clearCompare,
    maxCompare: LIMIT,
  };
}
