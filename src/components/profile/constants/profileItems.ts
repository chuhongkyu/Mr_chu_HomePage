export type ProfileItemDef = {
  code: string
  label: string
  color: string
  /** grid cell width */
  w: number
  /** grid cell depth */
  h: number
  /** 3D height */
  height: number
}

export const PROFILE_ITEMS: ProfileItemDef[] = [
  { code: 'bench',  label: 'Bench',  color: '#8b6f47', w: 2, h: 1, height: 0.5 },
  { code: 'box',    label: 'Box',    color: '#5b8dd9', w: 1, h: 1, height: 1.0 },
  { code: 'plant',  label: 'Plant',  color: '#5bd97a', w: 1, h: 1, height: 1.5 },
  { code: 'lamp',   label: 'Lamp',   color: '#d9b45b', w: 1, h: 1, height: 2.0 },
  { code: 'table',  label: 'Table',  color: '#c45bd9', w: 2, h: 2, height: 0.7 },
  { code: 'rock',   label: 'Rock',   color: '#94a3b8', w: 1, h: 1, height: 0.6 },
  { code: 'barrel', label: 'Barrel', color: '#d97a5b', w: 1, h: 1, height: 1.2 },
]

export const PROFILE_ITEM_MAP = Object.fromEntries(
  PROFILE_ITEMS.map((item) => [item.code, item])
) as Record<string, ProfileItemDef>
