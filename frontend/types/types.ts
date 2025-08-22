export interface Category {
    id: number;
    title: string;
}

export interface Image {
    caption: string;
    image: string; 
}

export interface Option {
    option_text: string;
    correct: boolean;
    image?: string;
}

export interface Question {
    id: number;
    question_source: string;
    category: Category[];
    question_text: string;
    images: Image[];
    options: Option[];
    explanation: string;
    difficulty: string;
}