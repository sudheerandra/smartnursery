import React, { useContext, useEffect, useState } from "react";
import { NurseryContext } from "../context/NurseryContext";

const WorkerTable = () => {
  const { workers, fetchWorkers, updateWorkerPayment } =
    useContext(NurseryContext);
  const [paymentInputs, setPaymentInputs] = useState({});

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handlePayNow = (worker) => {
    //console.log("Worker...", worker);
    const addAmount = Number(paymentInputs[worker._id] || 0);
    if (addAmount <= 0) {
      alert("❌ Enter valid payment amount");
      return;
    }
    if (worker.paid + addAmount > worker.salary) {
      alert("❌ Payment cannot exceed salary");
      return;
    }

    const newPaid = worker.paid + addAmount;
    updateWorkerPayment(worker._id, newPaid);
    setPaymentInputs({ ...paymentInputs, [worker._id]: "" });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-6">
      <h3 className="font-bold text-lg text-orange-700 mb-4 text-center">
        👷 Workers List
      </h3>

      {workers.length === 0 ? (
        <p className="text-center text-gray-500">No workers added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-orange-200">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Month</th>
                <th className="border px-4 py-2">Salary</th>
                <th className="border px-4 py-2">Paid</th>
                <th className="border px-4 py-2">Balance</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((w) => {
                const balance = w.salary - w.paid;
                const isPending = balance > 0;

                return (
                  <tr
                    key={w._id}
                    className={`text-center ${
                      isPending ? "bg-yellow-50" : "bg-green-50"
                    }`}
                  >
                    <td className="border px-4 py-2 font-semibold">{w.name}</td>
                    <td className="border px-4 py-2">{w.phone}</td>
                    <td className="border px-4 py-2">{w.role}</td>
                    <td className="border px-4 py-2">{w.month}</td>
                    <td className="border px-4 py-2 font-bold">₹{w.salary}</td>
                    <td className="border px-4 py-2">₹{w.paid}</td>
                    <td
                      className={`border px-4 py-2 font-bold ${
                        isPending ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      ₹{balance}
                    </td>
                    <td className="border px-4 py-2">
                      {isPending ? (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={paymentInputs[w._id] || ""}
                            onChange={(e) =>
                              setPaymentInputs({
                                ...paymentInputs,
                                [w._id]: e.target.value,
                              })
                            }
                            placeholder="₹"
                            className="w-20 p-1 border rounded"
                          />
                          <button
                            onClick={() => handlePayNow(w)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm w-full sm:w-auto"
                          >
                            Pay Now
                          </button>
                        </div>
                      ) : (
                        <span className="text-green-600 font-bold text-lg">
                          ✅ Paid
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkerTable;
