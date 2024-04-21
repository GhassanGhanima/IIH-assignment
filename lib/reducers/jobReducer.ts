import { JSX, ReactNode } from "react";

import { Job, JobsState } from "@/shared/interface/form-field";
import { ADD_JOB, CURRENT_PAGE, DELETE_JOB, FILLTER_SIDEBAR, JobsActionTypes, READ_JOBS, SEARCH_JOBS } from "../actions/actionsType";


const initialState: JobsState = {
  jobs: {
    jobs: [],
    totalRecord: 0,
    map: function (arg0: (jop: Job) => JSX.Element): ReactNode {
      throw new Error("Function not implemented.");
    },
    filter(arg0: (job: any) => boolean): ReactNode{
      throw new Error("Function not implemented.");
    }

  },

  currentPage: 1,
  filter:{
    sector:'',
    country:'',
    city:''
  },
  search:''
};

const jobsReducer = (state = initialState, action: JobsActionTypes): JobsState => {

  switch (action.type) {
    case READ_JOBS:
      return {
        ...state,
        jobs: {
          jobs: action.payload.jobs,
          totalRecord: action.payload.totalRecord,
          map: function (arg0: (jop: Job) => JSX.Element): ReactNode {
            throw new Error("Function not implemented.");
          },
          filter(arg0: (job: any) => boolean): ReactNode{
            throw new Error("Function not implemented.");
          }
        },
      };

    case SEARCH_JOBS:
      return {
        ...state,
        search:action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: {
          jobs: action.payload.jobs,
          totalRecord: action.payload.totalRecord,
          map: function (arg0: (jop: Job) => JSX.Element): ReactNode {
            throw new Error("Function not implemented.");
          },
          filter(arg0: (job: any) => boolean): ReactNode{
            throw new Error("Function not implemented.");
          }
        },
        filter:{
          sector:'',
          country:'',
          city:''
        },
        search:'',
        currentPage: 1
      };

    case DELETE_JOB:
      return {
        ...state,
        jobs: {
          jobs: action.payload.jobs,
          totalRecord: action.payload.totalRecord,
          map: function (arg0: (jop: Job) => JSX.Element): ReactNode {
            throw new Error("Function not implemented.");
          },
          filter(arg0: (job: any) => boolean): ReactNode{
            throw new Error("Function not implemented.");
          }
        },
        currentPage: 1
      };
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }

      case FILLTER_SIDEBAR:
        return {
          ...state,
          filter: action.payload,
        }
    default:
      return state;
  }
};


export default jobsReducer;
