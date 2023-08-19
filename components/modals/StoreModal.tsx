'use client'
import React from 'react'
import Modal from '@/components/ui/modal'
import { useModalHookStore } from '@/hooks/useModalHook'

const StoreModal = () => {
  const storeModal = useModalHookStore();

  return (
    <Modal 
     title='Create Store'
     description='Add a new store to manage products and categories'
     isOpen={storeModal.isOpen}
     onClose={storeModal.onClose}>
        Create Store
    </Modal>
  )
}

export default StoreModal