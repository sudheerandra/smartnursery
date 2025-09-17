import React, { useState, useContext } from "react";
import { NurseryContext } from "../context/NurseryContext";

const WorkerForm = () => {
  const { addWorker } = useContext(NurseryContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [paid, setPaid] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !role || !salary) return;

    await addWorker({ name, phone, role, salary, paid });

    setName("");
    setPhone("");
    setRole("");
    setSalary("");
    setPaid(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-6 bg-orange-100 rounded-xl shadow-lg max-w-2xl mx-auto"
    >
      <h3 className="font-bold text-lg text-orange-700 mb-4 text-center">
        👷 Add Worker
      </h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded-lg w-full mb-4"
      />

      <input
        placeholder="Phone Number"
        type="tel"
        value={phone}
        maxLength={10}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border rounded-lg w-full mb-4"
      />

      <input
        placeholder="Role (e.g. Gardener)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 border rounded-lg w-full mb-4"
      />

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="p-2 border rounded-lg w-full mb-4 appearance-none rounded-md focus:outline-none"
      />

      <input
        type="number"
        placeholder="Paid"
        value={paid}
        onChange={(e) => setPaid(Number(e.target.value))}
        className="p-2 border rounded-lg w-full mb-4"
      />

      <button
        type="submit"
        className="bg-orange-500 text-black px-6 py-2 rounded-lg"
      >
        Add Worker
      </button>
    </form>
  );
};

export default WorkerForm;
