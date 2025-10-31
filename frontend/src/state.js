import { useState, useEffect } from 'react';

let globalState = {
  count: 0,
  theme: 'light'
};

const listeners = [];

export function getState() {
  return globalState;
}

export function setState(newState) {
  globalState = {...globalState, ...newState};
  listeners.forEach(listener => listener(globalState));
}

export function useGlobalState() {
  const [state, setState] = useState(globalState);
  
  useEffect(() => {
    const handler = (newState) => setState(newState);
    listeners.push(handler);
    return () => {
      const index = listeners.indexOf(handler);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);
  
  const updateGlobalState = (newState) => {
    setState(newState);
  };
  
  return [state, updateGlobalState];
} 