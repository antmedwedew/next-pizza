import { useCallback, useMemo, useState } from 'react';

export interface StableActions<K> {
  add: (key: K) => void;
  remove: (key: K) => void;
  toggle: (key: K) => void;
  reset: () => void;
  clear: () => void;
}

export interface Actions<K> extends StableActions<K> {
  has: (key: K) => boolean;
}

const useSet = <K>(initialSet: Set<K> = new Set<K>()): [Set<K>, Actions<K>] => {
  const [set, setSet] = useState<Set<K>>(initialSet);

  const stableActions = useMemo<StableActions<K>>(() => {
    const add = (item: K) => setSet((prevSet: Set<K>) => new Set([...Array.from(prevSet), item]));
    const remove = (item: K) =>
      setSet((prevSet: Set<K>) => new Set(Array.from(prevSet).filter((i: K): boolean => i !== item)));
    const toggle = (item: K) =>
      setSet(
        (prevSet: Set<K>): Set<K> =>
          prevSet.has(item)
            ? new Set(Array.from(prevSet).filter((i: K): boolean => i !== item))
            : new Set([...Array.from(prevSet), item]),
      );

    return { add, remove, toggle, reset: () => setSet(initialSet), clear: () => setSet(new Set()) };
  }, [setSet]);

  const utils = {
    has: useCallback((item: K) => set.has(item), [set]),
    ...stableActions,
  } as Actions<K>;

  return [set, utils];
};

export default useSet;
