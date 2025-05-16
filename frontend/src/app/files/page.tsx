import { File } from '@/types/types'
import { FileTable } from '@/components/file-table'
import { columns } from '@/app/files/columns'
import FileUploader from '@/components/file-uploader'
import HeaderAuth from '@/components/header-auth'

export default async function Home() {
  const filesDownload: File[] = [
    {
      id: 1,
      name: 'DSA final 2021'
    },
    {
      id: 2,
      name: 'ITP final 2023'
    },
    {
      id: 1,
      name: 'DSA final 2021'
    },
    {
      id: 2,
      name: 'ITP final 2023'
    },
    {
      id: 1,
      name: 'DSA final 2021'
    },
    {
      id: 2,
      name: 'ITP final 2023'
    },
    {
      id: 1,
      name: 'DSA final 2021'
    },
    {
      id: 2,
      name: 'ITP final 2023'
    },
    {
      id: 1,
      name: 'DSA final 2021'
    },
    {
      id: 2,
      name: 'ITP final 2023'
    },
    {
      id: 1,
      name: 'DSA final 2021'
    },
    {
      id: 2,
      name: 'ITP final 2023'
    }
  ]

  return (
    <>
      <HeaderAuth />
      <main className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
        <section className="flex w-[80%] flex-row items-center justify-around gap-8">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-background text-3xl">Files to download</h3>
            <FileTable columns={columns} data={filesDownload} />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-background text-3xl">Your uploaded files</h3>
            <FileTable columns={columns} data={filesDownload} />
          </div>
        </section>
        <FileUploader />
      </main>
    </>
  )
}
