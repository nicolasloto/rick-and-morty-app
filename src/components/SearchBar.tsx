interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Buscar personaje..."
        className="w-full max-w-md p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  )
}

export default SearchBar
