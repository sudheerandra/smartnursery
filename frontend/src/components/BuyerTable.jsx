import React, { useContext, useState } from "react";
import { NurseryContext } from "../context/NurseryContext";

const BuyerTable = () => {
  const { buyers, updateBuyerPayment } = useContext(NurseryContext);
  const [payInputs, setPayInputs] = useState({});

  const handlePayNow = (buyerId, total, paid) => {
    const amount = Number(payInputs[buyerId]);
    if (!amount || amount <= 0) {
      alert("⚠️ Enter a valid payment amount");
      return;
    }
    if (amount + paid > total) {
      alert("⚠️ Payment exceeds total");
      return;
    }

    // Call backend API
    updateBuyerPayment(buyerId, paid + amount);

    // Reset input
    setPayInputs((prev) => ({ ...prev, [buyerId]: "" }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-8 max-w-7xl mx-auto overflow-x-auto">
      <h3 className="font-bold text-xl md:text-2xl text-green-700 mb-4 text-center">
        📜 Buyer Orders
      </h3>

      <table className="min-w-full border border-gray-300 text-sm bg-gray-50">
        <thead className="bg-green-200">
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Buyer</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Plants</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Paid</th>
            <th className="border px-4 py-2">Balance</th>
            <th className="border px-4 py-2">Pay Now</th>
          </tr>
        </thead>
        <tbody>
          {!buyers || buyers.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-4 text-center">
                No buyers yet
              </td>
            </tr>
          ) : (
            buyers.map((b) => {
              const balance = b.total - b.paid;
              const orderDate = new Date(b.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <tr key={b._id} className="text-center">
                  <td className="border px-4 py-2">{orderDate}</td>
                  <td className="border px-4 py-2 font-semibold">{b.name}</td>
                  <td className="border px-4 py-2">{b.phone}</td>
                  <td className="border px-4 py-2 text-left">
                    <ul className="text-sm">
                      {b.plants?.map((p) => (
                        <li key={`${p.plantId}-${p.size}`}>
                          {p.plant} - {p.size} - {p.quantity} pcs (₹{p.total})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2 font-bold">₹{b.total}</td>
                  <td className="border px-4 py-2 text-green-700 font-semibold">
                    ₹{b.paid}
                  </td>
                  <td className="border px-4 py-2 text-red-600 font-semibold">
                    ₹{balance}
                  </td>
                  <td className="border px-4 py-2">
                    {balance > 0 ? (
                      <div className="flex justify-center items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max={balance}
                          value={payInputs[b._id] || ""}
                          onChange={(e) =>
                            setPayInputs((prev) => ({
                              ...prev,
                              [b._id]: e.target.value,
                            }))
                          }
                          placeholder="₹ Pay"
                          className="border p-1 rounded w-20"
                        />
                        <button
                          onClick={() =>
                            handlePayNow(b._id, b.total, b.paid)
                          }
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          💰 Pay
                        </button>
                      </div>
                    ) : (
                      <span className="text-green-600 font-semibold">Paid</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerTable;
