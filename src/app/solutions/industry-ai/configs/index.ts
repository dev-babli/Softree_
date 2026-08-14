export { healthcareConfig } from "./healthcare";
export { manufacturingConfig } from "./manufacturing";
export { financialServicesConfig } from "./financial-services";
export { logisticsConfig } from "./logistics";

import { healthcareConfig } from "./healthcare";
import { manufacturingConfig } from "./manufacturing";
import { financialServicesConfig } from "./financial-services";
import { logisticsConfig } from "./logistics";
import type { IndustryPageConfig } from "../types";

export const industryConfigs: Record<string, IndustryPageConfig> = {
  "ai-for-healthcare": healthcareConfig,
  "ai-for-manufacturing": manufacturingConfig,
  "ai-for-financial-services": financialServicesConfig,
  "ai-for-logistics": logisticsConfig,
};
