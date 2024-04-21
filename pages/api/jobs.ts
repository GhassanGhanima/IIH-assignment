import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const filePath = path.join(process.cwd(), 'public', 'data', 'jobs.json');
    let jsonData: any[];

    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      jsonData = JSON.parse(data);
    } catch (error) {
      jsonData = [];
    }


    // search by job params 
    const { search, id, currentPage } = req.query;
    if (search && typeof search === 'string') {
      jsonData = jsonData.filter((job: any) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ************************************ this is the all GET requests ************************************ 
    if (req.method === 'GET') {

      // search by job id 
      if (id && typeof id === 'string') {
        const job = jsonData.find((job: any) => job.id === id);
        if (job) {
          res.status(200).json({ id, job });
        } else {
          res.status(404).json({ message: 'Job not found' });
        }
      }
      const { jobs, totalRecord } = Paginations(currentPage, jsonData)
      res.status(200).json({ jobs, totalRecord });


      // ************************************ this is the all POST requests ************************************ 


    } else if (req.method === 'POST') {
      const newJob = {
        id: generateUniqueId(),
        title: req.body.title,
        country: req.body.country,
        description: req.body.description,
        sector: req.body.sector,
        city: req.body.city
      };

      jsonData.unshift(newJob);
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      const { jobs, totalRecord } = Paginations(currentPage, jsonData)


      res.status(201).json({ jobs, totalRecord });

      // ************************************ this is the all DELETE requests ************************************ 

    } else if (req.method === 'DELETE') {
      const { id, currentPage } = req.query;

      if (!id) {
        return res.status(400).json({ message: 'Job ID is missing in parameters' });
      }
      const index = jsonData.findIndex((job: any) => job.id === id);
      let totalRecord
      if (index !== -1) {
        jsonData.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(jsonData));
        const { jobs, totalRecord } = Paginations(currentPage, jsonData)
        res.status(200).json({ id, jobs, totalRecord });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } else {

      res.setHeader('Allow', ['GET', 'DELETE', 'POST']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



function generateUniqueId() {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  const randomPart = Math.random().toString(16).substr(2);
  return `${timestamp}${randomPart}`.padEnd(16, '0');
}




function Paginations(currentPage: any, jsonData: any) {
  const itemsPerPage = 10;
  let totalRecord = jsonData.length;
  let startIdx = 0;
  if (currentPage && typeof currentPage === 'string') {
    const pageNum = parseInt(currentPage, 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      startIdx = (pageNum - 1) * itemsPerPage;
    }
  }

  return {
    jobs: jsonData.slice(startIdx, startIdx + itemsPerPage),
    totalRecord: totalRecord
  }

}