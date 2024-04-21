import { ThunkAction } from "redux-thunk";
import { UnknownAction } from "redux";

import { ADD_JOB, CURRENT_PAGE, DELETE_JOB, FILLTER_SIDEBAR, JobsActionTypes, READ_JOBS, SEARCH_JOBS } from "./actionsType";
import { Job, FormData, FilterSideBar } from "@/shared/interface/form-field";

export const readJobs = (currentPage: number = 1, searchParams: string = ""): ThunkAction<void, UnknownAction, JobsActionTypes, any> => {
  return async (dispatch) => {
    try {
      let url = "api/jobs";
      url += `?currentPage=${currentPage}`;
      if (searchParams) {
        url += `&search=${encodeURIComponent(searchParams)}`;
      }

      const response = await fetch(url)
      const jobs: Job[] = await response.json();
      dispatch({
        type: READ_JOBS,
        payload: jobs,
      });
    } catch (error) {
      console.error("Error reading jobs:", error);
    }
  };
};



export const addJob = (fromData: FormData): ThunkAction<void, UnknownAction, any, JobsActionTypes> => {
  return async (dispatch) => {
    try {
      const response = await fetch("api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fromData)
      });
      const newJob: Job = await response.json();
      dispatch({
        type: ADD_JOB,
        payload: newJob
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };
};

export const deleteJob = (id: string, currentPage: number = 1): ThunkAction<void, UnknownAction, any, JobsActionTypes> => {
  return async (dispatch) => {
    try {
      const response = await fetch(`api/jobs?id=${id}&&currentPage=${currentPage}`, {
        method: "DELETE"
      });
      const Jobs: Job = await response.json();

      dispatch({
        type: DELETE_JOB,
        payload: Jobs
      });
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
};

export const readSearch = (searchParams?: string): ThunkAction<void, UnknownAction, any, JobsActionTypes> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_JOBS,
        payload: searchParams,
      });
    } catch (error) {
      console.error("Error reading jobs:", error);
    }
  };
};

export const setCurrentPageAction = (currentPage?: number): ThunkAction<void, UnknownAction, any, JobsActionTypes> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CURRENT_PAGE,
        payload: currentPage,
      });
    } catch (error) {
      console.error("Error reading jobs:", error);
    }
  };
};
export const setFilterAction = (filter: FilterSideBar): ThunkAction<void, UnknownAction, any, JobsActionTypes> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILLTER_SIDEBAR,
        payload: filter,
      });
    } catch (error) {
      console.error("Error reading jobs:", error);
    }
  };
};




