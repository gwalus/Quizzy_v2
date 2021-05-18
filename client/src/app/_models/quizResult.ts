export class QuizResult {
    id: number;
    category: string;
    ammount: number;
    difficulty: string;
    userAnswers: string[] = [];
    correctAnswers: string[] = [];
    points: number[] = [];
    totalScore: number;
}