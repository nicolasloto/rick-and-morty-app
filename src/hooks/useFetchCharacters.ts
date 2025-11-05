import { useEffect, useState } from 'react'
import { api } from '../services/api'

export interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

export const useFetchCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [query, setQuery] = useState('')

  const fetchCharacters = async (newPage = 1, search = '') => {
    try {
      setLoading(true)
      setError('')

      const endpoint = search
        ? `/character/?page=${newPage}&name=${search}`
        : `/character/?page=${newPage}`

      const response = await api.get(endpoint)

      const results = response.data.results ?? []
      setCharacters(prev =>
        newPage === 1 ? results : [...prev, ...results]
      )

      setHasMore(!!response.data.info?.next)
    } catch (err) {
      setError('No se pudieron obtener los personajes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters(1, query)
  }, [query])

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchCharacters(nextPage, query)
    }
  }

  return {
    characters,
    loading,
    error,
    hasMore,
    query,
    setQuery,
    loadMore,
  }
}
