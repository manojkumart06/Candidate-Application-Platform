
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchJobsRequest, fetchJobsSuccess, fetchJobsFailure } from '../Redux/Actions/fetchAction';
import JobCard from './JobCard';

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [expand, setExpand] = useState(false);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": 10,
    "offset": 20
   });
   
   const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
   };

  const fetchJobs = () => async () => {
    dispatch(fetchJobsRequest(true));
    dispatch(fetchJobsFailure(null));
    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON?offset=' + offset + '&limit=10', requestOptions)
      const data = await response.json();
      //console.log('data is ',data.totalCount)
      const fullData = data.jdList;
      setCount(data.totalCount);
      dispatch(fetchJobsSuccess(fullData))
      setOffset(prevOffset => prevOffset + 10);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      dispatch(fetchJobsFailure(error.message));
    }finally {
     dispatch(fetchJobsRequest(false));
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      //console.log('Not fetching. Either already loading or not at the bottom of the page.');
      return;
    }
    //console.log('Fetching more jobs...');
    fetchJobs();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const handleExpand = () => {
    setExpand(prevExpand => !prevExpand);
  }

//   console.log('jobs.length is ',jobs.length);
//   console.log('count is',count)

  return (
    <div>
    <InfiniteScroll
    dataLength={jobs.length}
    next={fetchJobs}
    hasMore={jobs.length !== count} 
    loader={<p>Loading...</p>}
    endMessage={<p>No more data to load.</p>}
  >
    <Grid container spacing={3}>
       
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
            <JobCard job={job} expand ={expand} handleExpand ={handleExpand} />
          </Grid>
        ))
      }
    </Grid>
    </InfiniteScroll>
    {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default JobList;
