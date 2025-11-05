interface Props {
  query: string
  setQuery: (value: string) => void
}

const SearchBar = ({ query, setQuery }: Props) => {
  return (
    <div className="w-full flex justify-center mb-6">
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}

export default SearchBar
