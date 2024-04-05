import { useInterval } from "@vueuse/core";

export function useCustomInterval(callback) {
  // UseInterval

  const { reset, pause, resume } = useInterval(5000, {
    controls: true,
    immediate: true,
    callback,
  });

  return {
    reset,
    pause,
    resume,
  };
}
