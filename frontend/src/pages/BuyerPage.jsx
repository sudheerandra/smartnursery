import React from 'react';
import BuyerForm from '../components/BuyerForm';
import BuyersList from '../components/BuyerTable';

const BuyersPage = () => {
  return (
    <div>
      <BuyerForm />
      <BuyersList />
    </div>
  );
};

export default BuyersPage;
