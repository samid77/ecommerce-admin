'use client'
import React from 'react'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import { BillboardColumn } from './BillboardColumn'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';


interface BillboardCellActionProps {
    data: BillboardColumn;
}

const BillboardCellAction: React.FC<BillboardCellActionProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();
    
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Billboard Id copied to the clipboard');
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open Menu</span>
                    <MoreHorizontal className='h-4 w-4'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className='cursor-pointer' onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                    <Edit className='mr-2 h-4 w-4'/> Update Data
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => onCopy(data.id)}>
                    <Copy className='mr-2 h-4 w-4'/> Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                    <Trash className='mr-2 h-4 w-4'/> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default BillboardCellAction