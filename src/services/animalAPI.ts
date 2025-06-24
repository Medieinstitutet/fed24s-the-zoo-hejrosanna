import { Animal } from "../models/animal";

export class AnimalAPI {
  baseUrl = "https://animals.azurewebsites.net/api/animals";

  async getAnimals(): Promise<Animal[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error("Failed to fetch animals");
    const data = await response.json();
    return data.map((a: object) => new Animal(a));
  }

  async getAnimalById(id: number): Promise<Animal> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch animal by id");
    const data = await response.json();
    return new Animal(data);
  }

  async feedAnimal(animal: Animal): Promise<Animal> {
    const now = new Date().toISOString();
    const updatedAnimal = new Animal({
      ...animal,
      lastFed: now,
      isFed: true,
    });

    return updatedAnimal;
  }
}