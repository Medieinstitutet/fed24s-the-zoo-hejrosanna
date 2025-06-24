import { AnimalAPI } from "../services/animalAPI";
import { Animal } from "../models/animal";

const api = new AnimalAPI();

export const animalsLoader = async (): Promise<Animal[]> => {
  const animals = await api.getAnimals();
  return animals;
};

export const animalByIdLoader = async ({ params }: { params: { id: string } }): Promise<Animal> => {
  if (!params.id) throw new Response("Missing id", { status: 400 });

  const api = new AnimalAPI();
  const animal = await api.getAnimalById(Number(params.id));
  if (!animal) throw new Response("Animal not found", { status: 404 });

  return animal;
};