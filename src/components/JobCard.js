
import React from 'react';
import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import '../styles/JobCard.css'

const JobCard = ({ job,expand,handleExpand }) => {
  return (
    <div className = "card-container">
    <Card className="card-style" sx={{ p: 1, m: 2}} key={job.jdUid} >
    <CardContent>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img style={{ height: 40, width: 40, padding: '1rem' }} src="https://jobs.weekday.works/_next/static/media/logo-small.08826abd.png" alt="" />
        <div style={{ flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 14 }} color="text.secondary" gutterBottom>
            Company Name
          </Typography>
          <Typography variant="h6" component="div">
            {job.jobRole}
          </Typography>
          <Typography sx={{ fontWeight:"bold", mb: 1.5 }} color="text.primary">
            {job.location}
          </Typography>
        </div>
      </div>
      <Typography sx={{fontSize: 15}} color="text.primary">
        Estimated Salary : ₹{job.minJdSalary} - {job.maxJdSalary}LPA✅
      </Typography>
      <Typography sx={{fontSize: 16, fontWeight: 550}} color="text.primary">
        About Company:
      </Typography>
      <Typography sx={{fontSize: 14, fontWeight: 700}} color="text.primary">
        About us
      </Typography>
      <Typography className="truncate"> 
        {expand ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.substr(0,100) + "..."}
      </Typography>
      {expand ?  <ExpandLessOutlined onClick = {handleExpand}/> : <ExpandMoreOutlined onClick={handleExpand}/>}

    </CardContent>
    <CardActions>
      <Button className ='apply-button' size="small"> ⚡ Easy Apply</Button>
    </CardActions>
  </Card>
  </div>
  );
};

export default JobCard;
