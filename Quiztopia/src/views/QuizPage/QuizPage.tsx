import './QuizPage.css'
import { useState, useRef, useEffect } from 'react'
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CreateQuiz, AddQuestion, Position, GetQuiz } from '../../interfaces'


mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2Jqb2gwOCIsImEiOiJjbGx6M2pqMXYwZTZ5M2NvNzNscm5rZWtuIn0.C2QkVLDoLFvrae_e65EGpg';

function QuizPage() {

    const [quizname, setQuizname] = useState<string>('')
    const [question, setQuestion]   = useState<string>('')
    const [answer, setAnswer]       = useState<string>('')
    const [quizData, setQuizData] = useState<any>(null);

    const mapContainer = useRef(null)
    const mapRef = useRef<MapGl | null>(null)
    const [lat, setLat] = useState<number>(57.7)
    const [lng, setLng] = useState<number>(11.89)
    const [zoom, setZoom] = useState<number>(10)


    useEffect(() => {
        if( mapRef.current || !mapContainer.current ) return

        mapRef.current = new MapGl({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        const map: MapGl = mapRef.current

        map.on('move', () => {

            const position: Position = map.getCenter()
            setLat(Number(position.lat.toFixed(4)))
            setLng(Number(position.lng.toFixed(4)))
            setZoom(map.getZoom());
        })
           
    }, [lat, lng, zoom])

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

    // const handleGetQuiz = async () => {
	// 	const token = localStorage.getItem('token')
    //     const username = localStorage.getItem('username')
	// 	const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'

	// 	const settings = {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
	// 		},
	// 		body: JSON.stringify({
    //             name: quizname,
    //             question: question,
    //             answer: answer,
    //             location:{
    //                 longitude: lng,
    //                 latitude: lat
    //             }
                
    //         })
	// 	}
    //     const response = await fetch(url, settings)
    //     const data: GetQuiz = await response.json()
    //     console.log(data);
    //  }   

    const QuizComponent = () => {
        const [quizData, setQuizData] = useState(null);
      
        useEffect(() => {
          // Fetch data when the component mounts
          fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz')
            .then((response) => response.json())
            .then((data) => setQuizData(data))
            .catch((error) => console.error('Error fetching data:', error));
        }, []);


    return(
        <div className="quiz-container">
            <header>
                <h1>Quizmania</h1>
            </header>
            <main>
                <section className="quiz-map" ref={mapContainer}>

                </section>
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
                    </div>
                </aside>
                <section>
                {/* <button onClick={handleGetQuiz}>Get quiz</button> */}
                <h1>Quiz Information</h1>
      {quizData ? (
        <>
          <p>User ID: {quizData.userId}</p>
          <p>Quiz ID: {quizData.quizId}</p>

          <h2>Questions</h2>
          <ul>
            {quizData.questions.map((question, index) => (
              <li key={index}>
                <p>Question: {question.question}</p>
                <p>Answer: {question.answer}</p>
                <p>Longitude: {question.location.longitude}</p>
                <p>Latitude: {question.location.latitude}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
                </section>
            </main>

        </div>
    )
}

export default QuizPage
