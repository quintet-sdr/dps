'use client'

import { ColumnDef } from '@tanstack/react-table'
import { File } from '@/types/types'
import { Download } from 'lucide-react'

export const columns: ColumnDef<File>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'File name'
  },
  {
    accessorKey: 'download',
    header: '',
    cell: ({ row }) => {
      const v = row.original

      return <Download className="cursor-pointer" />
    }
  }
]
