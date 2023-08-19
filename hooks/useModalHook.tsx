import {create} from 'zustand';

interface useModalHookStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useModalHookStore = create<useModalHookStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useModalHookStore;

