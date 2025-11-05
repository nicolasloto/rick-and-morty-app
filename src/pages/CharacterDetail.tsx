import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import type { Character } from "../hooks/useFetchCharacters";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/character/${id}`);
        setCharacter(res.data);
      } catch (err) {
        setError("No se pudo cargar el personaje.");
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!character) return null;

  return (
    <div className="p-6 flex flex-col items-center">
      <Link
        to="/lista-de-personajes"
        className="text-blue-500 hover:underline mb-4"
      >
        ← Volver
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-80 object-cover"
        />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">{character.name}</h2>
          <p className="text-gray-900 dark:text-gray-100">{character.species}</p>
          <p
            className={`mt-2 font-medium ${
              character.status === "Alive"
                ? "text-green-500"
                : character.status === "Dead"
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            {character.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
