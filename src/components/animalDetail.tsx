import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Animal } from "../models/animal";
import { AnimalAPI } from "../services/animalAPI";
import fallback8 from "../assets/fallback_8.jpg";
import fallback13 from "../assets/fallback_13.jpg";

const api = new AnimalAPI();

const AnimalDetail: React.FC = () => {
  const animalFromLoader = useLoaderData() as Animal | null;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(animalFromLoader);
  const [status, setStatus] = useState<{ text: string; color: string }>(
    animal?.getDetailFeedingStatus() || { text: "", color: "" }
  );
  const [isFeeding, setIsFeeding] = useState(false);
  const [imgSrc, setImgSrc] = useState(animal?.imageUrl || "");

  useEffect(() => {
    if (!id) return;

    const fetchAnimalDetail = async () => {
      try {
        const fullAnimal = await api.getAnimalById(Number(id));
        setAnimal(fullAnimal);
        setStatus(fullAnimal.getDetailFeedingStatus());
        setImgSrc(fullAnimal.imageUrl);
      } catch (error) {
        console.error("Failed to fetch animal details", error);
      }
    };

    fetchAnimalDetail();
  }, [id]);

  useEffect(() => {
    if (!animal) return;

    const timer = setInterval(() => {
      setStatus(animal.getDetailFeedingStatus());
    }, 60000);

    return () => clearInterval(timer);
  }, [animal]);

  const handleFeed = async () => {
    if (!animal) return;
  
    setIsFeeding(true);
  
    try {
      const updatedAnimal = await api.feedAnimal(animal);
      alert(`${animal.name} has been fed!`);
      setAnimal(updatedAnimal);
      setStatus(updatedAnimal.getDetailFeedingStatus());
      setImgSrc(updatedAnimal.imageUrl);
    } catch (err) {
      alert("Failed to feed the animal.");
    } finally {
      setIsFeeding(false);
    }
  };

  const onImageError = () => {
    if (!animal) return;

    if (animal.id === 8) setImgSrc(fallback8);
    else if (animal.id === 13) setImgSrc(fallback13);
  };

  if (!animal) return <p>Animal could not be found.</p>;

  return (
    <section className="animal-detail">
      <p className="back-link" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        ⬅ Back
      </p>

      <img src={imgSrc} alt={animal.name} onError={onImageError} />

      <h2>{animal.name}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: animal.getLongDescription() || "No long description available.",
        }}
      />

      <p className="status-text" style={{ color: status.color }}>
        <strong>Status:</strong> {status.text}
      </p>

      <p>
        <strong>Last fed:</strong> {animal.formattedLastFed()}
      </p>

      {animal.isWarning() && (
        <p style={{ color: "orange", fontWeight: "bold" }}>
          ⚠ {animal.name} is getting hungry!
        </p>
      )}

      <button className="btn" disabled={!animal.canBeFed() || isFeeding} onClick={handleFeed}>
        {isFeeding ? "Feeding..." : `Feed ${animal.name}`}
      </button>
    </section>
  );
};

export default AnimalDetail;