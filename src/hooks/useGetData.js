import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetData(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(false)


  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'http://sf-legacy-api.now.sh/items',
      params: {  page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setItems(prevBooks => [...prevBooks, ...res.data.data])
      setHasMore(res.data.metadata.totalItems > items.length)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, items, hasMore }
}
