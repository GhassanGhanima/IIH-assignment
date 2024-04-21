import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readJobs, setCurrentPageAction } from "@/lib/actions/JopAction";
import { FilterSideBar, Job, JobsState } from "@/shared/interface/form-field";

import MainHeader from "../main/main-header";
import Pagination from "../shared/HtmlComponents/pagination";
import Card from "../shared/HtmlComponents/card";


export interface MainProps {
  onMobileMenuopen: () => void;
}
const selectJobs = (state: { jobs: JobsState, currentPage: number, search: string, filter: FilterSideBar }) => state;


const Main: React.FC<MainProps> = ({ onMobileMenuopen }) => {
  const [pageNumber, setpageNumber] = useState<number>(1)
  const [resetPagination, setResetPagination] = useState<boolean>(false)
  const [filterdJobs, setFilterdJobs] = useState<Job[] | []>()


  const dispatch = useDispatch<any>();
  const JopStore = useSelector(selectJobs);
  useEffect(() => {

    dispatch(readJobs(JopStore.currentPage, JopStore.search));

     let filterdArray= filterJobsHandler(JopStore.jobs)
     
    setFilterdJobs(filterdArray)

  }, [JopStore.jobs.jobs,JopStore.currentPage, JopStore.search])


  const onPageChange = (pageNumber: number) => {
    dispatch(setCurrentPageAction(pageNumber))
  }

  const filterJobsHandler = (jobArray:JobsState) => {
    return  jobArray.jobs.filter(job => {
      const sectorMatch = JopStore.filter.sector === ''? true : job.sector === JopStore.filter.sector;
      const countryMatch = JopStore.filter.country ===''? true : job.country === JopStore.filter.country;
      const cityMatch = JopStore.filter.city === ''? true : job.city === JopStore.filter.city;

      return sectorMatch && countryMatch && cityMatch;
    });

  }



return (
  <>
    <div className="main-container">
      <MainHeader  onMobileMenuopen={onMobileMenuopen} />
      <section className="jop-secton">
        {filterdJobs?.map((jop: Job) => (
          <Card key={jop.id}
            title={jop.title}
            description={jop.description}
            city={jop.city}
            country={jop.country}
            sector={jop.sector} id={jop.id}
          />
        ))}
      </section>

      <section className="pagination">
        <Pagination totalItems={JopStore.jobs.totalRecord} currentPage={JopStore.currentPage} itemsPerPage={10} onPageChange={onPageChange} />
      </section>
    </div>

  </>
);
}


export default Main