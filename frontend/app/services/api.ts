import { Question } from "../../types/types";
import { API_CONFIG, getApiUrl } from "../config/api";

interface PaginatedQuestionApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Question[];
}

export class ApiService {
  static async getQuestions(page: number = 1, pageSize: number = 50): Promise<{ questions: Question[], total: number }> {
    try {
      const response = await fetch(
        `${getApiUrl(API_CONFIG.ENDPOINTS.QUESTIONS)}?page=${page}&page_size=${pageSize}`,
        {
          method: "GET",
          headers: API_CONFIG.HEADERS,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaginatedQuestionApiResponse = await response.json();
      return { questions: data.results, total: data.count };
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Return fallback questions if API fails
      const fallback = this.getFallbackQuestions();
      return { questions: fallback, total: fallback.length };
    }
  }

  static async getQuestionsByCategory(categoryId: number, page: number = 1, pageSize: number = 50): Promise<{ questions: Question[], total: number }> {
    try {
      const response = await fetch(
        getApiUrl(API_CONFIG.ENDPOINTS.QUESTIONS_BY_CATEGORY),
        {
          method: "POST",
          headers: API_CONFIG.HEADERS,
          body: JSON.stringify({ 
            category: categoryId,
            page: page,
            page_size: pageSize
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaginatedQuestionApiResponse = await response.json();
      return { questions: data.results, total: data.count };
    } catch (error) {
      console.error("Error fetching questions by category:", error);
      // Fallback: try to get all questions and filter by category
      try {
        const allData = await this.getQuestions(1, 1000); // Get a large batch for filtering
        const filtered = allData.questions.filter((q) =>
          q.category.some((cat) => cat.id === categoryId)
        );
        return { questions: filtered, total: filtered.length };
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        return { questions: [], total: 0 };
      }
    }
  }

  static async getRandomQuestion(): Promise<Question | null> {
    try {
      const response = await fetch(
        getApiUrl(API_CONFIG.ENDPOINTS.RANDOM_QUESTION),
        {
          method: "GET",
          headers: API_CONFIG.HEADERS,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.question || data; // Handle different response formats
    } catch (error) {
      console.error("Error fetching random question:", error);
      return null;
    }
  }

  static async getQuestionsByDifficulty(
    difficulty: string,
    page: number = 1,
    pageSize: number = 50
  ): Promise<{ questions: Question[], total: number }> {
    try {
      const response = await fetch(
        getApiUrl(API_CONFIG.ENDPOINTS.QUESTIONS_BY_DIFFICULTY),
        {
          method: "POST",
          headers: API_CONFIG.HEADERS,
          body: JSON.stringify({ 
            difficulty,
            page: page,
            page_size: pageSize
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaginatedQuestionApiResponse = await response.json();
      return { questions: data.results, total: data.count };
    } catch (error) {
      console.error("Error fetching questions by difficulty:", error);
      // Fallback: filter from all questions
      try {
        const allData = await this.getQuestions(1, 1000); // Get a large batch for filtering
        const filtered = allData.questions.filter((q) => q.difficulty === difficulty);
        return { questions: filtered, total: filtered.length };
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        return { questions: [], total: 0 };
      }
    }
  }

  static async getCategories(): Promise<any[]> {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.CATEGORIES), {
        method: "GET",
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  private static getFallbackQuestions(): Question[] {
    return [
      {
        id: 1,
        question_source: "NASA Basics",
        question_text: "<p>What does <strong>NASA</strong> stand for?</p>",
        explanation:
          "<p>NASA is America's space agency. They study space, build rockets, and explore the universe!</p>",
        difficulty: "E",
        category: [{ id: 1, title: "NASA" }],
        options: [
          {
            option_text: "<p>National Aeronautics and Space Administration</p>",
            correct: true,
          },
          { option_text: "<p>North American Space Agency</p>", correct: false },
          {
            option_text: "<p>New Air and Space Adventures</p>",
            correct: false,
          },
          {
            option_text: "<p>National Airplane Science Academy</p>",
            correct: false,
          },
        ],
        images: [],
      },
      {
        id: 2,
        question_source: "Military Aviation",
        question_text:
          "<p>What type of aircraft is the <strong>F-22 Raptor</strong>?</p>",
        explanation:
          "<p>The F-22 Raptor is a fifth-generation stealth fighter aircraft used by the United States Air Force. It's one of the most advanced fighter jets in the world!</p>",
        difficulty: "M",
        category: [{ id: 2, title: "Military Aircraft" }],
        options: [
          { option_text: "<p>Stealth Fighter</p>", correct: true },
          { option_text: "<p>Transport Plane</p>", correct: false },
          { option_text: "<p>Helicopter</p>", correct: false },
          { option_text: "<p>Bomber</p>", correct: false },
        ],
        images: [],
      },
    ];
  }
}
