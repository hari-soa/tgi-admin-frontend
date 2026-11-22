import { useCallback, useEffect, useRef, useState } from "react";

const LIVE_REFRESH_INTERVAL_MS = 8000;
const DATA_CHANGED_EVENT = "tgi:data-changed";

export const RESOURCE_STATUS = {
  LOADING: "loading",
  READY: "ready",
  ERROR: "error",
};

export const notifyDataChanged = () => {
  window.dispatchEvent(new Event(DATA_CHANGED_EVENT));
};

export const useLiveResource = (
  loadResource,
  { initialValue, enabled = true, dependencies = [] },
) => {
  const [data, setData] = useState(initialValue);
  const [status, setStatus] = useState(
    enabled ? RESOURCE_STATUS.LOADING : RESOURCE_STATUS.READY,
  );
  const [errorMessage, setErrorMessage] = useState("");
  const hasLoadedOnce = useRef(false);
  const requestCounter = useRef(0);
  const loaderRef = useRef(loadResource);
  const enabledRef = useRef(enabled);
  loaderRef.current = loadResource;
  enabledRef.current = enabled;

  const reload = useCallback(async () => {
    if (!enabledRef.current) return;
    if (!hasLoadedOnce.current) setStatus(RESOURCE_STATUS.LOADING);
    requestCounter.current += 1;
    const requestId = requestCounter.current;

    try {
      const loadedData = await loaderRef.current();
      if (requestId !== requestCounter.current) return;
      hasLoadedOnce.current = true;
      setData(loadedData);
      setErrorMessage("");
      setStatus(RESOURCE_STATUS.READY);
    } catch (error) {
      if (requestId !== requestCounter.current) return;
      setErrorMessage(error.message);
      setStatus(RESOURCE_STATUS.ERROR);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      hasLoadedOnce.current = false;
      setData(initialValue);
      setErrorMessage("");
      setStatus(RESOURCE_STATUS.READY);
      return undefined;
    }

    hasLoadedOnce.current = false;
    setStatus(RESOURCE_STATUS.LOADING);
    reload();

    const intervalId = window.setInterval(reload, LIVE_REFRESH_INTERVAL_MS);
    window.addEventListener("focus", reload);
    window.addEventListener("online", reload);
    window.addEventListener(DATA_CHANGED_EVENT, reload);

    return () => {
      requestCounter.current += 1;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", reload);
      window.removeEventListener("online", reload);
      window.removeEventListener(DATA_CHANGED_EVENT, reload);
    };
  }, [enabled, reload, ...dependencies]);

  return {
    data,
    status,
    errorMessage,
    hasData: hasLoadedOnce.current,
    reload,
  };
};
