import { PROFILE_ITEM_MAP } from '@/components/profile/constants/profileItems'
import { useProfilePlacementStore } from '@/components/profile/store/useProfilePlacementStore'

import { gridItemCenter } from './InventoryGridEngine'

const InventoryDragPreview = () => {
  const dragState = useProfilePlacementStore((s) => s.dragState)

  if (!dragState || dragState.gridX === null || dragState.gridY === null) return null

  const itemDef = PROFILE_ITEM_MAP[dragState.code]
  if (!itemDef) return null

  const [cx, , cz] = gridItemCenter(dragState.gridX, dragState.gridY, itemDef.w, itemDef.h)
  const color = dragState.isValidPlacement ? itemDef.color : '#ef4444'

  return (
    <mesh position={[cx, itemDef.height / 2, cz]}>
      <boxGeometry args={[itemDef.w - 0.08, itemDef.height, itemDef.h - 0.08]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

export default InventoryDragPreview
