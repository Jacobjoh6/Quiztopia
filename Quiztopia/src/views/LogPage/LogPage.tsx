import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LogPage.css'
import { ApiSignupResponse, ApiLoginResponse, Account  } from '../../interfaces';

function LogPage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage]   = useState<string>('')

// nya api https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup
  const handleCreateUser = async () => {
    
    const url = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup`
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    const response = await fetch(url, settings)
    const data: ApiSignupResponse = await response.json()
    console.log('handleCreateUser: ',data);

    if (data.success) {
      setMessage('användaren skapades!')
    } else{
      setMessage('Kunde inte skapa användare!')
    }    
};

  const handleLogin = async () => {
    const url = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login`
    const logSettings = {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    const logResponse = await fetch(url, logSettings)
    const logData: ApiLoginResponse = await logResponse.json()
    
    localStorage.setItem('token', logData.token)
    localStorage.setItem('username', logData.username)

    console.log('handleLogin: ', logData);
    navigate('/quiz')

  }

  const navMap = () => { 
    navigate('/map')
  }

  const navQuiz = () => { 
    navigate('/quiz')
  }


  return (
    <div>
      <header>
        <h1>Quiztopia</h1>
      </header>
      <main className='login-form'>
        <section className='framed'>
          <h2>Hantera användare</h2>
          <h3>Username</h3>
          <input type="text" placeholder='username' value={username} onChange={event => setUsername(event.target.value)}/>
          <h3>Password</h3>
          <input type="text" placeholder='password' value={password} onChange={event => setPassword(event.target.value)}/>
        <div className='framed-div'>
          <button className='framed-div__button' onClick={handleCreateUser }>skapa användare</button>
          <button className='framed-div__button' onClick={handleLogin}>logga in</button>
        </div>
        <p>{message}</p>
        <div>
          <button className='framed-div__button' onClick={navMap}>map</button>
          <button className='framed-div__button' onClick={navQuiz}>quiz</button>
        </div>
        </section>

        {/* <section className='framed'>
          <h2>när inloggad</h2>
          <p>{token ? token : 'ingen token'}</p>
          <button onClick={ handleToken }>get user info</button>
          <p>{message2}</p>
        </section> */}
      </main> 
    </div>
  )
}

export default LogPage