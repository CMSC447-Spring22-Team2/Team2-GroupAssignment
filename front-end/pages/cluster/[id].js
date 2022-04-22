import { useRouter } from 'next/router'

export default function Cluster() {
  const router = useRouter()
  console.log(router)
  const id = router.query.id

  return (
    <div>
      <h1>Cluster {id}</h1>
    </div>
  )
}
