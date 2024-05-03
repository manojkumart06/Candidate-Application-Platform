
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { fetchJobsRequest, fetchJobsSuccess, fetchJobsFailure } from '../Redux/Actions/fetchAction';
import JobCard from './JobCard';

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

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

  const fetchJobs = () => async () => {
    dispatch(fetchJobsRequest());
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
      const data = await response.json();
      console.log('data is ',data)
      dispatch(fetchJobsSuccess(data.jdList));
    } catch (error) {
      console.error("Error fetching jobs:", error);
      dispatch(fetchJobsFailure(error.message));
    }
  };

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);


  return (
    <Grid container spacing={3}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
            <JobCard job={job} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default JobList;
