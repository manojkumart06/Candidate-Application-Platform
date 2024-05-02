import { useEffect, useState } from 'react';
import './App.css';
import FilterBar from './components/FilterBar';

function App() {

  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": 10,
    "offset": 50
   });
   
   const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
   };

   const fetchData = async () => {
    try{
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON?offset=' + offset + '&limit=10', requestOptions)
      const data = await response.json();
      const fulldata = data.jdList;
      console.log('data is',data.jdList);
      //setJobs(fulldata);
      setJobs(prevJobs => [...prevJobs, ...fulldata]);
      
    }catch{
      console.log('error occured');
    }
   };

   useEffect(() => {
      fetchData();
   },[]);
   
   

  return (
    <div className="App">
      <h1>Search jobs</h1>
      <div className='Filter-list'>
      <FilterBar />
      </div>
      <div>
        {jobs.map((item) => (
          <>
          <span>{item.jobRole}</span><br></br>
          <span>{item.location}</span>
          </>
        )
      )}
      </div>
    </div>
  );
}


export default App;
