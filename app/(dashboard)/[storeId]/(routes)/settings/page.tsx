import React from 'react'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import SettingsForm from '@/components/SettingsForm';
import prismadb from '@/lib/prismadb';


interface SettingPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage: React.FC<SettingPageProps> = async ({params}) => {
  const userId = auth();
  if(!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: {
        id: params.storeId
    }
  })
  if(!store) redirect('/');


  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SettingsForm initialData={store}/>
        </div>
    </div>
  )
}

export default SettingsPage