import React from "react";

import type { ProfileItemDef } from "./profileItems";
import IceCube from "./IceCube";
import { Cluster } from "./Cluster";

export type ItemRenderer = (def: ProfileItemDef) => React.ReactElement;

/**
 * 커스텀 3D 컴포넌트가 있는 아이템만 등록.
 * 등록되지 않은 아이템은 InventoryItem에서 generic box로 폴백.
 */
export const PROFILE_ITEM_COMPONENT_REGISTRY: Record<string, ItemRenderer> = {
  iceCube: (def) => <IceCube w={def.w} h={def.h} height={def.height} />,
  crystal: () => <Cluster />,
};
