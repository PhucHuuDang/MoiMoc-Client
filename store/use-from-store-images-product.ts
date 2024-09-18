import { useEffect, useState } from "react";

export const useFromStoreImagesProduct = <TInput, TOutput>(
  hook: (callback: (state: TInput) => unknown) => unknown,
  storeCallback: (state: TInput) => TOutput,
) => {
  const [state, setState] = useState<TOutput>();

  const stateImagesProduct = hook(storeCallback) as TOutput;

  useEffect(() => {
    setState(stateImagesProduct);
  }, [stateImagesProduct]);

  return state;
};
