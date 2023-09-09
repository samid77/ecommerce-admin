'use client'
import React, { useState } from 'react'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import Heading from '@/components/Heading'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';




const formSchema = z.object({
    name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
    initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
        <div className='flex items-center justify-between'>
            <Heading 
                title='Settings'
                description='Manage store preferences'
            />
            <Button size={'sm'} variant={'destructive'} onClick={() => {}}>
                <Trash className='h-4 w-4'/>
            </Button>
        </div>
        <Separator />
    </>
  )
}

export default SettingsForm