import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { deleteJob } from "@/lib/actions/JopAction";
import { Job } from "@/shared/interface/form-field";

import Modal from "./modal";
import JobView from "../viewJop";


const selectJobs = (state: { currentPage: number }) => state;

export default function Card({ title, description, city, country, sector, id }: Job) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const JopStore = useSelector(selectJobs);

  const dispatch = useDispatch<any>();


  const handleDelete = () => {
    dispatch(deleteJob(id, JopStore.currentPage));
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card jop-card">
        <div className="card-body">
          <Image src="/image/th.jpg" alt="jop-img" priority={true} className="jop-img" width={130} height={130} />
          <div className="card-content">
            <h6 className="jop-title">{title}</h6>
            <p className="jop-location"> {city} ,{country} </p>
            <p className="jop-sector">{sector}</p>
            <p className="jop-desc">{description}</p>
          </div>
          <div className="card-action">
            <button className="btn-sm-primary" role="button" title="View Jop" onClick={openModal}><span className="btn-text">View Jop</span> <span className="icon icon-show "></span></button>
            <button className="btn-sm-danger" role="button" title="Delete Jop" onClick={handleDelete}><span className="btn-text">Delete Jop</span><span className="icon icon-delete  "></span></button>
          </div>
        </div>
      </div>
      {isModalOpen &&
        <Modal isOpen={isModalOpen} onClose={closeModal} className="modal-sm"
          header={<h3>Veiw Job Post</h3>}
          body={<JobView jobId={id} onClose={closeModal} />}
        >
        </Modal>
      }

    </>
  );
}


