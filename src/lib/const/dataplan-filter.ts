import { TabFilterProps } from "@/types/prop-types";

export const dayTab: TabFilterProps = {
  filters: ["Recommended", "1d", "3d", "7d", "10d", "15d", "30d"],
  paramKey: "day",
  fallback: "recommended",
  replace: true,
};

export const dataPlanTab: TabFilterProps = {
  filters: ["Limited", "Unlimited"],
  paramKey: "dataplan",
  fallback: "limited",
  replace: true,
};

export const pageDataPlanFilterKeys = [dayTab.paramKey, dataPlanTab.paramKey];

export const fallbackPageDataPlanFilter = {
  [dayTab.paramKey]: dayTab.fallback,
  [dataPlanTab.paramKey]: dataPlanTab.fallback,
};
