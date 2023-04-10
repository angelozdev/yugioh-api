import React, { EffectCallback } from "react";

function useEffectOnce(effect: EffectCallback) {
  React.useEffect(effect, []);
}

export default useEffectOnce;
