import './QuizPage.css'
import { useState } from 'react'

interface CreateQuiz {
    username: string,
    quizname: string,
    token?: string
}

interface AddQuestion{
    username: string,
    question: string,
    answer: string,
    location:{
        longitude: string,
        latitude: string
    }
}

function QuizPage() {

    const [quizname, setQuizname] = useState<string>('')
    const [question, setQuestion]   = useState<string>('')
    const [answer, setAnswer]       = useState<string>('')
    const [userlocation, setUserlocation] = useState<any>(null)

    const handleAddQuiz = async () => {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
        const username = localStorage.getItem('username')
        const token = localStorage.getItem('token')
        console.log('token:',token);
        
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: quizname
            })
        }   
        const response = await fetch(url, settings)
        const data: CreateQuiz = await response.json()
        console.log('quiz created:', data);
        
    }

    const handleAddQuestion = async() => {
        
        // const username = localStorage.getItem('username')
        const token = localStorage.getItem('token')
        const lat = '47'
        const long = '35'
        console.log('question:', question,'Answer:', answer);
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question'
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: quizname,
                question: question,
                answer: answer,
                location:{
                    longitude: long,
                    latitude: lat
                }
            })
        }
        const response = await fetch(url, settings)
        const data: AddQuestion = await response.json()
        console.log('added question', data);
        
    }

    return(
        <div className="quiz-container">
            <header>
                <h1>Quizmania</h1>
            </header>
            <main>
                <section className="quiz-map"></section>
                <aside>
                    <input type="text" value={quizname}    onChange={event => setQuizname(event.target.value)}/>
                    <button onClick={ handleAddQuiz }>Create quiz</button>
                </aside>
                <aside className="quiz-container__btn">
                    <div className='btn-div'>
                        <input type="text" 
                        placeholder="Question" 
                        className='input' 
                        value={question} 
                        onChange={event => setQuestion(event.target.value)}
                        />
                        <button className='btn'
                        onClick={handleAddQuestion}>Add question</button>
                    </div>
                    <div className='btn-div'>
                        <input type="text" 
                        placeholder="Answer" 
                        className='input' 
                        value={answer} 
                        onChange={event => setAnswer(event.target.value)}
                        />
                        {/* <button className='btn'>Add answer</button> */}
                    </div>
                </aside>
            </main>

        </div>
    )
}

export default QuizPage
