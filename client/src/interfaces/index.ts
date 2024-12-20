export interface Users {
  id: number;
  name: string;
  password: string;
  email: string;
  role: number;
  profilePicture: string;
  status: boolean;
}

export interface Courses {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface ExamSubjects {
  id: number;
  title: string;
  image: string;
  description: string;
  courseId: number;
}

export interface Exams {
  id: number;
  title: string;
  image: string;
  description: string;
  duration: number;
  examSubjectId: number;
}

export interface Questions {
  id: number;
  question: string;
  examId: number | null;
  options: string[];
  answer: string;
}

export interface userAnswers {
  id: number;
  userId: number;
  exampId: number;
  score: number;
}

export interface LocationState {
  correct: number;
  incorrect: number;
  time: number;
  score: number;
}

export interface ResultCardProps {
  title: string;
  value: number | string;
  icon: string;
  highlight?: boolean;
}

export interface Comment {
  id?: number;
  userId: number;
  examId: number;
  content: string;
  create_at: string;
}
