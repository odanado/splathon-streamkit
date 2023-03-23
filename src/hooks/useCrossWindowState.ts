import { useSyncExternalStore, useState, useRef, useEffect } from "react";

export const useCrossWindowState = <T>(
  stateKey: string,
  defaultValue: T
): [state: T, setState: (state: T) => void] => {
  const [state, setState] = useState<T>(defaultValue);
  const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);

    return () => {
      window.removeEventListener("storage", callback);
    };
  };

  const storageText = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(stateKey),
    () => ""
  );

  useEffect(() => {
    console.log(JSON.parse(storageText ?? ""));
    setState(() => JSON.parse(storageText ?? ""));
  }, [storageText]);

  useEffect(() => {
    localStorage.setItem(stateKey, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
