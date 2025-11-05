import { Link } from 'react-router-dom'
import type { Character } from '../hooks/useFetchCharacters'

interface Props {
  character: Character
}

const CharacterCard = ({ character }: Props) => {
  return (
    <Link
      to={`/personaje/${character.id}`}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
          {character.name}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {character.species} — {character.status}
        </p>
      </div>
    </Link>
  )
}

export default CharacterCard
