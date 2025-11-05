import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import type { Character } from "../hooks/useFetchCharacters";

interface Episode {
  id: number;
  name: string;
  episode: string; // Ej: "S01E01"
}

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacterAndEpisodes = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/character/${id}`);
        const data: Character = res.data;
        setCharacter(data);

        // 🧩 Obtener IDs de los episodios desde las URLs
        const episodeIds = data.episode.map((epUrl: string) =>
          epUrl.split("/").pop()
        );

        // ⚡ Llamada combinada a todos los episodios
        const epRes = await api.get(`/episode/${episodeIds.join(",")}`);
        const episodesData = Array.isArray(epRes.data)
          ? epRes.data
          : [epRes.data];

        setEpisodes(episodesData);
      } catch (err) {
        setError("No se pudo cargar el personaje ni sus episodios.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterAndEpisodes();
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

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden w-full max-w-md">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-80 object-cover"
        />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
            {character.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{character.species}</p>
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

        {/* 🧾 Lista de episodios */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Apariciones en episodios:
          </h3>
          <ul className="max-h-60 overflow-y-auto space-y-2">
            {episodes.map((ep) => (
              <li
                key={ep.id}
                className="text-sm bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2"
              >
                <span className="font-medium">{ep.episode}</span> — {ep.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
