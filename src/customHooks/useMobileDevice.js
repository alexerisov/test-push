import { useState, useEffect } from "react";
import { isMobileOrTabletDevice } from "@/utils/IsMobileOrTablerDevideHelper";

export const useMobileDevice = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    setIsMobileOrTablet(isMobileOrTabletDevice());
  });

  return [isMobileOrTablet];
};
