import { SearchResultItem } from "../types";

// Mock Knowledge Base data for WORLD
const WORLD_KNOWLEDGE_BASE: SearchResultItem[] = [
  {
    id: "1",
    title: "The Nature of Reality",
    category: "Insights",
    createdDate: "2024-03-22",
    summary: "Exploring the fundamental question of what it means for something to be 'real' vs 'imaginary'.",
    fullContent: "Reality is a complex concept. In modern physics, it's defined by what can be measured and observed. However, philosophy suggests that reality is also what we experience subjectively."
  },
  {
    id: "2",
    title: "Dark Matter & Energy",
    category: "Research",
    createdDate: "2024-03-22",
    summary: "Understanding the unseen 95% of the universe that shapes cosmic evolution.",
    fullContent: "Dark matter provides the gravitational scaffolding for galaxies, while dark energy is causing the universe's expansion to accelerate. Together, they dominate the cosmic budget."
  },
  {
    id: "3",
    title: "The Multiverse Hypothesis",
    category: "Insights",
    createdDate: "2024-03-22",
    summary: "The theory that our universe is just one of many, perhaps infinite, domains of existence.",
    fullContent: "The multiverse theory emerges from several areas of physics, including COSMY theory and string theory. It suggests that every possible outcome exists in some branch of reality."
  },
  {
    id: "4",
    title: "Neural Networks and Consciousness",
    category: "WORLDPedia",
    createdDate: "2024-03-22",
    summary: "How artificial neural structures compare to biological brains.",
    fullContent: "Modern AI models emulate biological neural pathways to process information. While they can perform complex tasks, the question of whether they possess true 'consciousness' remains a subject of intense debate."
  }
];

export const queryKnowledgeBase = async (query: string): Promise<SearchResultItem[]> => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const searchTerms = query.toLowerCase().split(' ');
  
  // Filter based on query
  const results = WORLD_KNOWLEDGE_BASE.filter(item => {
    const itemText = (item.title + " " + item.summary + " " + item.category).toLowerCase();
    return searchTerms.every(term => itemText.includes(term));
  });

  return results;
};