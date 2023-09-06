import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './HomePage.css'

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

interface ApiTokenResponse{
  success: boolean;
  message?: string;
  account: Account;
}

interface Account {
  password: string
  userId: string
  username: string

}

function HomePage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage]   = useState<string>('')
  const [token, setToken]       = useState<string>('') 
  const [message2, setMessage2] = useState<string>('')

// nya api https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup
// gamla api https://jv4lxh2izk.execute-api.eu-north-1.amazonaws.com

  const handleCreateUser = async () => {

    //1. Samla ihop användarnamn och lösenord
    //2. förklara request
    //3. skicka request och vänta på svar
    //4. oavsett success eller failure: visa för användaren
    console.log();
    
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
    
  }

  // const handleToken = async () => {
  //   const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/account'
  //   const settings = {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }
  //   const response = await fetch(url, settings)
  //   const data: ApiTokenResponse = await response.json()
  //   console.log('handleToken', data);
  //       if(data.success && data.account) {
  //         const account: Account = data.account 
  //         setMessage2(`userid: ${account.userId}`)
  //       } else{
  //         setMessage2('kunde inte hämta användar info')
  //       }
  //       console.log(data.account);
        
  // }

  




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

export default HomePage