'use client'
import React, { useState } from 'react'
import { Billboard } from '@prisma/client'
import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';


import Heading from '@/components/Heading'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AlertModal from '@/components/modals/AlertModal';
import ApiAlert from './ui/api-alert';
import {useOriginHook} from '@/hooks/useOriginHook';
import ImageUpload from '@/components/ui/image-upload';

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData: Billboard | null;
}

const BillboardForm: React.FC<BillboardFormProps> = ({initialData}) => {

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { 
        label: '',
        imageUrl: '',
    },
  })
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const origin = useOriginHook();
  const title = initialData ? 'Edit Billboard' : 'Create Billboard';
  const description = initialData ? 'Edit a Billboard' : 'Add a new billboard';
  const toastMessage = initialData ? 'Billboard Updated' : 'Billboard Created';
  const action = initialData ? 'Save Changes' : 'Create';


  const onSubmit = async(data: BillboardFormValues) => {
    try {
        setLoading(true);
        await axios.patch(`/api/stores/${params.storeId}`, data)
        router.refresh();
        toast.success('Store updated.');
    } catch (error) {
        console.error(error);
        toast.error('Something went wrong.Store failed to change')
    } finally {
        setLoading(false);
    }
  }

  const onDelete = async() => {
    try {
        setLoading(true)
        await axios.delete(`/api/stores/${params.storeId}`)
        router.refresh();
        router.push('/');
        toast.success('Store successfully delete')
    } catch (error) {
        console.error(error)
        toast.error('Make sure you removed all products and categories first.')
    } finally {
        setLoading(false);
        setOpen(false)
    }
  }

  return (
    <>
        <AlertModal 
            isOpen={open} 
            onClose={() => setOpen(false)} 
            onConfirm={onDelete}
            loading={loading}
        />
        <div className='flex items-center justify-between'>
            <Heading 
                title={title}
                description={description}
            />
            {
                initialData && (
                    <Button disabled={loading} size={'sm'} variant={'destructive'} onClick={() => setOpen(true)}>
                        <Trash className='h-4 w-4'/>
                    </Button>
                )
            }
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                <FormField 
                    control={form.control}
                    name='imageUrl'
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Background Image</FormLabel>
                        <FormControl>
                            <ImageUpload 
                                onRemove={() => field.onChange('')}
                                onChange={(url) => field.onChange(url)}
                                imageValue={field.value? [field.value] : []}
                                disabled={loading}
                            /> 
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className='grid grid-cols-3 gap-8'>
                    <FormField 
                     control={form.control}
                     name='label'
                     render={({field}) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Billboard Label' {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )}
                    />
                </div>
                <Button disabled={loading} className='ml-auto' type='submit'>{action}</Button>
            </form>
        </Form>
        <Separator />
    </>
  )
}

export default BillboardForm