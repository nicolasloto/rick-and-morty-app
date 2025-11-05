import { useEffect, useRef, useCallback } from 'react'
import { useFetchCharacters } from '../hooks/useFetchCharacters'
import CharacterCard from '../components/CharacterCard'
import SearchBar from '../components/SearchBar'

const CharacterList = () => {
  const {
    characters,
    loading,
    error,
    hasMore,
    query,
    setQuery,
    loadMore,
  } = useFetchCharacters()

  const observer = useRef<IntersectionObserver | null>(null)
  const lastCharacterRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, loadMore]
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-lime-500">
        Rick and Morty Characters
      </h1>

      <SearchBar query={query} setQuery={setQuery} />

      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((char, index) => {
          if (index === characters.length - 1) {
            return (
              <div ref={lastCharacterRef} key={char.id}>
                <CharacterCard character={char} />
              </div>
            )
          } else {
            return <CharacterCard key={char.id} character={char} />
          }
        })}
      </div>

      {loading && (
        <p className="text-center mt-6 text-gray-500">Cargando...</p>
      )}
    </div>
  )
}

export default CharacterList
