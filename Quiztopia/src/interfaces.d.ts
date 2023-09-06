//MapPage
interface Position {
	lng: number;
	lat: number;
}

interface GetQuiz {
	questions: AddQuestion[];
	userId: string;
	quizId: string;
}

//LogPage
interface ApiSignupResponse {
    success: boolean;
    message?: string;
}

interface ApiLoginResponse {
    username: string,
    success: boolean;
    message?: string;
    token: string;
}

interface Account {
    password: string
    userId: string
    username: string
  
  } 

//QuizPage
interface CreateQuiz {
    username: string,
    quizname: string,
    token?: string
}

interface AddQuestion{
    username: string,
    question: string,
    answer: string,
}

export { Position, GetQuiz, ApiSignupResponse, ApiLoginResponse, Account, CreateQuiz, AddQuestion }