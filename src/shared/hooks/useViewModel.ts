import { useState, useEffect } from "react";
import type { BaseViewModel } from "../view-models/BaseViewModel";

export const useViewModel = <T extends BaseViewModel>(viewModel: T): T => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const onUpdate = () => forceUpdate(c => c + 1);
    const unsubscribe = viewModel.subscribe(onUpdate);

    return () => unsubscribe();
  }, [viewModel]);

  return viewModel;
};
