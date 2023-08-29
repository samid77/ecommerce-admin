'use client'

import React, {useEffect} from 'react';
import { useModalHookStore } from '@/hooks/useModalHook';

const SetupPage = () => {
  const onOpen = useModalHookStore((state) => state.onOpen);
  const isOpen = useModalHookStore((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen) onOpen()
  }, [isOpen, onOpen])

  // return (
  //   <div className="flex flex-col gap-3 items-center justify-center p-10 text-lg font-semibold">
  //     <div className="p-3 bg-gray-200 rounded-lg">
  //       Root page, protected route
  //     </div>
  //   </div>
  // )
  return null;
}

export default SetupPage
  