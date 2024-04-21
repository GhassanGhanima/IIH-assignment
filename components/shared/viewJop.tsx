import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Job } from '@/shared/interface/form-field';

interface JobViewProps {
    jobId: string;
    onClose: () => void;
}

const JobView: React.FC<JobViewProps> = ({ jobId, onClose }) => {
    const [job, setJob] = useState<Job | null>(null)

    useEffect(() => {
        const loadJob = async () => {
            setJob(null)
            try {
                const response = await fetch(`api/jobs?id=${jobId}`);; // Notice the leading slash
                const jobData = await response.json();
                setJob(jobData.job)
            } catch (error) {
                console.error("Error loading Job:", error);
            }
        };
        loadJob();

    }, [jobId])


    return (
        <div className="card card-view">
            <div className="card-body">
                <Image src="/image/th.jpg" alt="jop-img" priority={true} className="jop-img" width={130} height={130} />
                <div className="card-content">
                    <h6 className="jop-title">{job?.title}</h6>
                    <p className="jop-location"> {job?.city}, {job?.country} </p>
                    <p className="jop-sector">{job?.sector}</p>
                    <p className="jop-desc">{job?.description} </p>
                </div>
                <div className="modal-actions">
                    <button className="btn btn-secondary" title="close" type="button" onClick={onClose}>close</button>
                </div>
            </div>
        </div>
    );
};

export default JobView;
