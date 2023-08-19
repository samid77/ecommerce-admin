'use client'
import React from 'react'
import Modal from '@/components/ui/modal'
import * as zod from 'zod';
import  {zodResolver}  from '@hookform/resolvers/zod';
import { useModalHookStore } from '@/hooks/useModalHook'
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = zod.object({
  name: zod.string().min(1),

})

const StoreModal = () => {
  const storeModal = useModalHookStore();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    }
  })

  const submitStore = async (values: zod.infer<typeof formSchema>) => {
    console.log(`values: ${JSON.stringify(values, undefined, 2)}`)
  }

  return (
    <Modal 
     title='Create Store'
     description='Add a new store to manage products and categories'
     isOpen={storeModal.isOpen}
     onClose={storeModal.onClose}>
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitStore)}>
              <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Store Name' {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button variant='outline' onClick={storeModal.onClose}>Cancel</Button>
                <Button type='submit'>Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal