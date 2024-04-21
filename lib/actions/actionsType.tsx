import { FilterSideBar, Job } from "@/shared/interface/form-field";


export const READ_JOBS = "READ_JOBS";
export const ADD_JOB = "ADD_JOB";
export const DELETE_JOB = "DELETE_JOB";
export const SEARCH_JOBS = "SEARCH_JOBS";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const FILLTER_SIDEBAR = "FILLTER_SIDEBAR";



interface ReadJobsAction {
  type: typeof READ_JOBS;
  payload: {
    jobs: Job[],
    totalRecord: number
  }
}

interface searchJopAction {
  type: typeof SEARCH_JOBS;
  payload: string
}

interface AddJobAction {
  type: typeof ADD_JOB;
  payload: {
    jobs: Job[],
    totalRecord: number
  }
}

interface DeleteJobAction {
  type: typeof DELETE_JOB;
  payload: {
    jobs: Job[],
    id: string,
    totalRecord: number
  }
}
interface CurrentPageAction {
  type: typeof CURRENT_PAGE;
  payload: number
}

interface FillterSidebarAction {
  type: typeof FILLTER_SIDEBAR;
  payload: FilterSideBar
}


export type JobsActionTypes = ReadJobsAction | AddJobAction | DeleteJobAction | searchJopAction | CurrentPageAction | FillterSidebarAction;
