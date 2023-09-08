import { useNavigate } from "react-router-dom"
import './HomePage.css'


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
        <div className="homepage-container">
          <header className="homepage-container-header">
            <h1 className="homepage-container-header__title">Quiztopia</h1>
          </header>
          <main className="homepage-container-main">
            <section className="homepage-container-section">
              <h3>Create your own quiz</h3>
              <button className="homepage-container-section__btn" onClick={ navLog }>Create quiz</button>
            </section>
            <section>
              <h3>Play</h3>
              <button className="homepage-container-section__btn" onClick={ navQuiz }>All quizzes</button>
            </section>
          </main>
        </div>
    )
}

export default HomePage