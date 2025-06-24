export interface AnimalDTO {
  id: number;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  description?: string;
  imageUrl: string;
  isFed: boolean;
  lastFed: string;
  species?: string;
  art?: string;
  [key: string]: unknown;
}

export class Animal {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  isFed: boolean;
  lastFed: Date;
  species: string;

  constructor(data: AnimalDTO) {
    this.id = data.id;
    this.name = data.name;
    this.shortDescription = data.shortDescription || "No short description available.";
    this.description = data.longDescription || data.description || "No long description available.";
    this.imageUrl = data.imageUrl;
    this.isFed = data.isFed;
    this.lastFed = new Date(data.lastFed);

    if (data.species && data.species.trim() !== "") {
      this.species = data.species;
    } else if (data.art && data.art.trim() !== "") {
      this.species = data.art;
    } else {
      this.species = "Unknown";
      console.warn(`Species is missing for animal with ID ${this.id}:`, data);
    }
  }

  hoursSinceFed(): number {
    const now = new Date();
    return (now.getTime() - this.lastFed.getTime()) / (1000 * 60 * 60);
  }

  formattedLastFed(): string {
    return this.lastFed.toLocaleString();
  }

  getOverviewFeedingStatus(): string {
    const hours = this.hoursSinceFed();
    if (hours < 3) return "Full";
    if (hours < 5) return "Getting hungry";
    return "Hungry";
  }

  getDetailFeedingStatus(): { text: string; color: string } {
    const hours = this.hoursSinceFed();
    if (hours < 3) return { text: "Full", color: "green" };
    if (hours < 4) return { text: "Getting hungry", color: "orange" };
    return { text: "Hungry!", color: "red" };
  }

  isWarning(): boolean {
    const hours = this.hoursSinceFed();
    return hours >= 3 && hours < 4;
  }

  canBeFed(): boolean {
    return this.hoursSinceFed() >= 4;
  }

  getShortDescription(): string {
    return this.shortDescription;
  }

  getLongDescription(): string {
    return this.description;
  }
}