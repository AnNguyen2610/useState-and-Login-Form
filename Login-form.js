import React, {useState} from 'react';

function login({username, password}){
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      if(username === 'AnNguyen2610' && password === 'password'){
        resolve();
      }else{
        reject();
      }
    }, 1000);
  });
}

function LoginForm(){
  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);
    setError('');
    
    try{
      await login({username, password});
      setIsLoggedIn(true);
      setPassword('');
      setError('');
    } catch(error){
      setError('Incorrect username or password!');
    }    

    setIsLoading(false);    
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUsername('');
  }

  return(    
    <div className="App">
      <div className="card5">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button 
              className="btn btn-warning"
              onClick={handleLogOut}              
            >
            Log Out
            </button>
          </>
        ) : ( 
        <form className="form-group">
          {error && <p className="heading4 red">{error}</p>}
          <p>Please Login!</p>
          <input 
            type="text" 
            placeholder="username" 
            className="form-control" 
            value={username}
            onChange={e => setUsername(e.currentTarget.value)}
            /><br/>
          <input 
            type="password"
            placeholder="password"
            autoComplete="new-password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          /><br/>
          <button
            className="submit btn btn-success btn-block"
            type="submit"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
          
        </form>
        )}
      </div>
    </div>    
  )
}

export default LoginForm;
