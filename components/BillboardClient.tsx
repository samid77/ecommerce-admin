'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { BillboardColumn, columns } from './BillboardColumn'



interface BillboardClientProps {
  data: BillboardColumn[]
}


const BillboardClient: React.FC<BillboardClientProps> = ({data}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
     <div className='flex items-center justify-between'>
        <Heading 
          title={`Billboards (${data.length})`} 
          description='Manage Billboards for your store'/>
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className='mr-2 h-4 w-4'/>Add New Billboard
        </Button>
     </div>
     <Separator />
     <DataTable 
        columns={columns}
        data={data}
        searchKey='label'
     />
    </>
  )
}

export default BillboardClient