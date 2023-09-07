import './QuizPage.css'
import { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CreateQuiz, AddQuestion, Position, GetQuiz } from '../../interfaces'



mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2Jqb2gwOCIsImEiOiJjbGx6M2pqMXYwZTZ5M2NvNzNscm5rZWtuIn0.C2QkVLDoLFvrae_e65EGpg';


function QuizPage() {
    
    const navigate = useNavigate();
    const [quizname, setQuizname] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer]     = useState<string>('')
    const [quizData, setQuizData] = useState<any>(null);
    const [quizzes, setQuizzes]   = useState<any>([])
    const [clickLat, setClickLat] = useState<number>()
    const [clickLng, setClickLng] = useState<number>()
    const mapContainer = useRef(null)
    const mapRef = useRef<MapGl | null>(null)
    const [lat, setLat] = useState<number>(57.7)
    const [lng, setLng] = useState<number>(11.89)
    const [zoom, setZoom] = useState<number>(10)
    const markerRef = useRef<mapboxgl.Marker | null>(null)
    const questionRef = useRef<mapboxgl.Marker | null>(null)
    
    
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
        
        map.on('click', (e) => {
            setClickLat(e.lngLat.lat)
            setClickLng(e.lngLat.lng)
            if (questionRef.current) {
                questionRef.current.remove()
            }
            
            const popup = new mapboxgl.Popup({offset: 25}).setHTML(
                `
                <div>
                <h3>${e.lngLat.lat}<h3/>
                <p>${e.lngLat.lng}<p/>
                <div/>
                `
                ).addTo(map)
            questionRef.current = new mapboxgl.Marker({}).setLngLat([e.lngLat.lng, e.lngLat.lat]).setPopup(popup) // popup
            //markerRef.current = new mapboxgl.Marker({}).setLngLat([lng, lat]).addTo(map)
                
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
            
            useEffect(() => {
                async function fetchData() {
                    try {
                        const data = await handleGetQuiz();
                        setQuizzes(data);
                    } catch (error) {
                        console.error('Error fetching quizzes:', error);
                    }
                }
                
                fetchData();
            }, []);
            
            async function handleGetQuiz(): Promise<GetQuiz[]> {
                try {
                    const url = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz";
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error(`Hämtningen av status misslyckades ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);
                    return data.quizzes;
                } catch (error) {
                    console.log("Något blev fel:", error);
                    throw error;
                }
            }
            
            const showAllQuiz = (quiz:any) => {
                navigate('/map', {state: quiz})
            }
            
            
            return(
                <div className="quiz-container">
                <header>
                <h1>Quizmania</h1>
                </header>
                <main className='quiz-container__main'>
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
                {/* <button className='btn'>Add answer</button> */}
                <button onClick={handleGetQuiz}>get all quiz</button>
                </div>
                </aside>
                <section>
                <h3>All quizes</h3>
                <article className='quiz-list'>
                <ul>
                {quizzes.map((quiz:any) => (
                    <li key={quiz.quizId.userId} className='quiz-list__item'>
                    <p>{quiz.username}</p>
                    <p>{quiz.quizId}</p>
                    <button onClick={() => showAllQuiz(quiz)}>show quiz</button>
                    </li>
                    ))}
                    </ul>
                    </article>
                    </section>
                    
                    
                    </main>
                    
                    </div>
                    )}
                    
                    export default QuizPage