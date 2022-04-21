import { useRouter } from 'next/router'

export default function Cluster() {
  const router = useRouter()
  console.log(router)

  return (
    <div>
      <h1>Cluster {router.query.id}</h1>
    </div>
  )
}
