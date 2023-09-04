import { log } from 'console'
import './QuizPage.css'
import { useState, useEffect } from 'react'

interface AddQuestion{
    name: string,
    question: string,
    answer: string,
    location:{
        longitude: string,
        latitude: string
    }
}

function QuizPage() {

    const [question, setQuestion]   = useState<string>('')
    const [answer, setAnswer]       = useState<string>('')
    const [userlocation, setUserlocation] = useState<any>('')
    // const [longitude, setLongitude] = useState<string>('')
    // const [latitude, setLatitude]   = useState<string>('')

    const handleQuestion = () => {
        console.log('question:', question,'Answer:', answer);
        
    }

    const handleAnswer = () => {
        
    }

    return(
        <div className="quiz-container">
            <header>
                <h1>Quizmania</h1>
            </header>
            <main>
                <section className="quiz-map"></section>
                <aside className="quiz-container__btn">
                    <div className='btn-div'>
                        <input type="text" 
                        placeholder="Question" 
                        className='input' 
                        value={question} 
                        onChange={event => setQuestion(event.target.value)}/>
                        <button className='btn'
                        onClick={handleQuestion}>Add question</button>
                    </div>
                    <div className='btn-div'>
                        <input type="text" 
                        placeholder="Answer" 
                        className='input' 
                        value={answer} 
                        onChange={event => setAnswer(event.target.value)}/>
                        <button className='btn'>Add answer</button>
                    </div>
                </aside>
            </main>

        </div>
    )
}

export default QuizPage
