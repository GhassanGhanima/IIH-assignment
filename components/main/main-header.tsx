import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { addJob, readSearch } from "@/lib/actions/JopAction";
import { useDebounce } from "@/lib/hooks";
import { FormData } from "@/shared/interface/form-field";

import Modal from "../shared/HtmlComponents/modal";
import AddJobForm from "../shared/addJop";



export interface MainHeaderProps {
  onMobileMenuopen: () => void;
}
const MainHeader: React.FC<MainHeaderProps> = ({ onMobileMenuopen }) => {

  const [search, setSearch] = useState('');
  const dispatch = useDispatch<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);



  const debouncedSearch = useDebounce(search, 1000);


  useEffect(() => {
    dispatch(readSearch(search));
  }, [debouncedSearch])
  


  const handleSearchInputChange = (newValue: string) => {
    setSearch(newValue)
  }


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AddNewJopForm = (formData: FormData) => {
    dispatch(addJob(formData));
    closeModal()

  }


  return (
    <>
      <div className="container-header">
        <input
          type="text"
          placeholder="Search by Job title" value={search}
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />
        <button type="button" className="btn btn-primary btn-add" title="Add new Job" onClick={openModal}>
          <span className="btn-text" > Add new Job</span>
          <span className="icon-add"></span>
        </button>
        <button type="button" className="btn btn-outline-primary btn-menu" title="Add new Job" onClick={onMobileMenuopen} >
          <span className="icon-menu"></span>
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}
        header={<h3>Add New Job Post</h3>}
        body={<AddJobForm onSubmit={AddNewJopForm} onClose={closeModal} />}
      >
      </Modal>
    </>
  );
}


export default MainHeader