import { create } from 'zustand'

export type CameraMode = 'perspective' | 'isometric'

type InventoryStore = {
  cameraMode: CameraMode
  toggleCameraMode: () => void
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  cameraMode: 'perspective',
  toggleCameraMode: () =>
    set((s) => ({ cameraMode: s.cameraMode === 'perspective' ? 'isometric' : 'perspective' })),
}))
