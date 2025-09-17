import React from 'react';
import WorkerForm from '../components/WorkerForm';
import WorkerTable from '../components/WorkerTable';

const WorkerPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <WorkerForm />
      <WorkerTable />
    </div>
  );
};

export default WorkerPage;
