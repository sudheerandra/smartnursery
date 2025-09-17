import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"

export const NurseryContext = createContext();

export const NurseryProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [plants, setPlants] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [workers, setWorkers] = useState([]);

  // ✅ Fetch all plants from backend
  const fetchPlants = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/plants`);
      setPlants(Array.isArray(data) ? data : []); // force array
    } catch (err) {
      console.error("Error fetching plants:", err);
    }
  };

  // ✅ Add new plant
  const addPlant = async (name, sizes) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/plants`, {
        name,
        sizes,
      });
      setPlants((prev) => [...prev, data]); // update UI
    } catch (err) {
      console.error("Error adding plant:", err);
      toast.error(err.message)
    }
  };

  // ✅ Update size (price/quantity)
  const updateSize = async (plantId, size, price, quantity) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/plants/size`, {
        plantId,
        size,
        price,
        quantity,
      });

      // Replace updated plant in local state
      setPlants((prev) => prev.map((p) => (p._id === data._id ? data : p)));
    } catch (err) {
      console.error("Error updating size:", err);
      toast.error(err.message);
    }
  };

  const addSizeToPlant = async (plantId, size, price, quantity) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/plants/size`, {
        plantId,
        size,
        price,
        quantity,
      });

      // update state so UI shows latest
      setPlants((prev) => prev.map((p) => (p._id === data._id ? data : p)));
    } catch (err) {
      console.error("Error adding size to plant:", err);
      toast.error(err.message);
    }
  };

  // 👤 Fetch buyers
  const fetchBuyers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/buyers`);
      setBuyers(response.data);
    } catch (err) {
      console.error("Error fetching buyers:", err);
      toast.error(err.message);
    }
  };

  // ➕ Add new buyer
  const addBuyer = async (buyerData) => {
    try {
      const res = await axios.post(`${backendUrl}/api/buyers`, buyerData);
      const newBuyer = res.data; // extract the buyer object
      setBuyers((prev) => [...prev, newBuyer]); // append to existing buyers
      // optional: fetch all buyers if needed
      fetchBuyers();
      fetchPlants();
    } catch (err) {
      console.error("Error adding buyer:", err.response?.data || err.message);
    }
  };

  // Update buyer payment
  const updateBuyerPayment = async (buyerId, newPaidAmount) => {
    try {
      const res = await axios.put(`${backendUrl}/api/buyers/${buyerId}/pay`, {
        amount: newPaidAmount,
      });

      // Update state
      setBuyers((prev) =>
        prev.map((b) => (b._id === buyerId ? res.data.data : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all workers
  const fetchWorkers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/workers`);
      setWorkers(data.data); // data.data matches controller response
    } catch (err) {
      console.error(err);
    }
  };

  // Add new worker
  const addWorker = async (workerData) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/workers`,
        workerData
      );
      setWorkers((prev) => [...prev, data.data]);
    } catch (err) {
      console.error(err);
    }
  };

  // Update worker payment
  const updateWorkerPayment = async (workerId, newPaid) => {
    //console.log("PAYNOW...", workerId, newPaid);
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/workers/${workerId}/payment`,
        { amount: newPaid }
      );
      setWorkers((prev) =>
        prev.map((w) => (w._id === workerId ? data.data : w))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlants();
    fetchBuyers();
    fetchWorkers();
  }, []);

  return (
    <NurseryContext.Provider
      value={{
        plants,
        addPlant,
        updateSize,
        addSizeToPlant,
        buyers,
        addBuyer,
        fetchBuyers,
        updateBuyerPayment,
        workers,
        fetchWorkers,
        addWorker,
        updateWorkerPayment,
        backendUrl
      }}
    >
      {children}
    </NurseryContext.Provider>
  );
};
