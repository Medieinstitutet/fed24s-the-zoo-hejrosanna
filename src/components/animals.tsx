import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Animal } from "../models/animal";
import fallback8 from "../assets/fallback_8.jpg"
import fallback13 from "../assets/fallback_13.jpg";
import "../styles/components.scss";

const Animals: React.FC = () => {
  const animals = useLoaderData() as Animal[];

  if (!animals || animals.length === 0) {
    return <p>Inga djur hittades.</p>;
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, id: number) => {
    const target = e.target as HTMLImageElement;
    if (id === 8) {
      target.src = fallback8;
    } else if (id === 13) {
      target.src = fallback13;
    } else {
      target.src = "/src/assets/fallback.jpg"; 
    }
  };

  return (
    <section>
      <h1>Djuröversikt</h1>
      <div className="animal-grid">
        {animals.map((animal) => (
          <article key={animal.id} className="animal-card">
            <Link to={`/animals/${animal.id}`}>
              <img
                src={animal.imageUrl}
                alt={animal.name}
                onError={(e) => handleImageError(e, animal.id)}
              />
              <h2>{animal.name}</h2>
            </Link>
            <p
              className="animal-short-description"
              dangerouslySetInnerHTML={{ __html: animal.shortDescription || "Ingen kort beskrivning." }}
            />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Animals;