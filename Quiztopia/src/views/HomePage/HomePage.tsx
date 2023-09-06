import { useNavigate } from "react-router-dom"


function HomePage() {
    const navigate = useNavigate();

    const navLog = () => { 
        navigate('/log')
      }
      const navMap = () => { 
        navigate('/map')
      }
      const navQuiz = () => { 
        navigate('/quiz')
      }
            

    return(
        <div>
            <h1>Home</h1>
            <button onClick={ navLog }>log</button>
            <button onClick={ navMap }>map</button>
            <button onClick={ navQuiz }>quiz</button>
        </div>
    )
}

export default HomePage