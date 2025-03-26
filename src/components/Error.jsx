import { IconExclamationCircle } from '@tabler/icons-react'

export default function Error() {
  return (
    <section className="w-full flex items-center">
      <div className="p-8 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-sm text-center">
        <div className="w-full flex justify-center mb-4">
            <IconExclamationCircle size={120} />
          </div>
          <p className="mb-4 text-3xl tracking-tight font-bold ">Algo não correu bem</p>
          <p className="mb-4 text-lg font-light ">Por favor, tente novamente mais tarde</p>
        </div>
      </div>
    </section>
  )
}
