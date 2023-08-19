'use client'
import React, {useState} from 'react'
import Modal from '@/components/ui/modal'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import  {zodResolver}  from '@hookform/resolvers/zod';
import {toast} from 'react-hot-toast';


import { useModalHookStore } from '@/hooks/useModalHook'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = zod.object({
  name: zod.string().min(1),

})

const StoreModal = () => {
  const storeModal = useModalHookStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    }
  })

  const submitStore = async (values: zod.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values)
      toast.success('Store created successfully')
      console.log(`response: ${JSON.stringify(response.data, undefined, 2)}`);
    } catch (error) {
      console.error(`SubmitStore error: ${JSON.stringify(error, undefined, 2)}`)
      toast.error('Create store failed. Something went wrong.')
    } finally {
      setLoading(false);
    }

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
                      <Input 
                        disabled={loading}
                        placeholder='Store Name' {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button 
                  variant='outline' 
                  disabled={loading}
                  onClick={storeModal.onClose}>Cancel</Button>
                <Button disabled={loading} type='submit'>Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal