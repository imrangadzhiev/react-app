import {useState, useEffect} from "react";

function App() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState('idle')
  const [button, setButton] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/languages");
        const result = await response.json();
        console.log(result, "result")
        setState(result);
        setLoading('success')
      } catch (e) {
        setLoading('error')
        console.error(e.message, "error in request");
      }
    };
    
    if (button) {
      setLoading('pending')
      fetchData();
    }
  }, [button]);
  
  const handleButton = () => {
    setButton(!button)
  }
  
  return (
    <div>
      <button onClick={handleButton}>start load langs: {String(button)}</button>
  
      <div>
        {
          loading === 'idle' ? 'state is null' : null
        }
      {
        loading === 'error' ? "error" : null
      }
  
      {
        loading === 'pending' ? '...' : null
      }
  
        {
          loading === 'success' ? state.match(item => (
            <div>{item}</div>
          )) : null
        }
      </div>
    </div>
  );
}

export default App;
