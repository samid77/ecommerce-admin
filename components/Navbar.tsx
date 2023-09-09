import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { MainNav } from '@/components/MainNav'
import StoreSwitcher from '@/components/StoreSwitcher'

const Navbar = () => {
  return (
    <div className='border-b'>
        <div className='flex items-center h-16 px-4'>
            <StoreSwitcher />
            <MainNav className='mx-6'/>
            <div className='ml-auto flex items-center space-x-4'>
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar