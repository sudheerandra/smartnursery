import React, { useState, useContext } from "react";
import { NurseryContext } from "../context/NurseryContext";

const BuyerForm = () => {
  const { addBuyer, plants } = useContext(NurseryContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plantsList, setPlantsList] = useState([]);
  const [plantId, setPlantId] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paid, setPaid] = useState(0);

  // ➕ Add or merge plant entry
  const handleSavePlant = () => {
    if (!plantId || !size || !quantity) return;

    const selectedPlant = plants.find((p) => p._id === plantId);
    if (!selectedPlant) return;

    // find price for this size
    const sizeObj = selectedPlant.sizes.find((s) => s.size === size);
    if (!sizeObj) return;
    const price = sizeObj.price;
    const total = Number(quantity) * price;

    const existingIndex = plantsList.findIndex(
      (p) => p.plantId === plantId && p.size === size
    );

    if (existingIndex >= 0) {
      const updated = [...plantsList];
      updated[existingIndex].quantity += Number(quantity);
      updated[existingIndex].total += total;
      setPlantsList(updated);
    } else {
      setPlantsList([
        ...plantsList,
        {
          plantId: selectedPlant._id,
          plant: selectedPlant.name,
          size,
          quantity: Number(quantity),
          price,
          total,
        },
      ]);
    }

    setPlantId("");
    setSize("");
    setQuantity("");
  };

  // ❌ Remove plant from list
  const handleRemovePlant = (index) => {
    setPlantsList(plantsList.filter((_, i) => i !== index));
  };

  const totalAmount = plantsList.reduce((sum, p) => sum + p.total, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || plantsList.length === 0) return;

    await addBuyer({
      name,
      phone,
      plants: plantsList,
      total: totalAmount,
      paid,
    });

    // reset
    setName("");
    setPhone("");
    setPlantsList([]);
    setPaid(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-6 bg-orange-100 rounded-xl shadow-lg max-w-3xl mx-auto w-full"
    >
      <h3 className="font-bold text-xl md:text-2xl text-orange-700 mb-6 text-center">
        🛒 Add Buyer
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          placeholder="Buyer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />

        <input
          placeholder="Phone Number"
          type="tel"
          value={phone}
          maxLength={10}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />
      </div>

      {/* Plant entry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={plantId}
          onChange={(e) => setPlantId(e.target.value)}
          className="p-2 border rounded-lg w-full"
        >
          <option value="">Select Plant</option>
          {plants.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          disabled={!plantId}
          className="p-2 border rounded-lg w-full"
        >
          <option value="">Select Size</option>
          {plantId &&
            plants
              .find((p) => p._id === plantId)
              ?.sizes.map((s) => (
                <option key={s.size} value={s.size}>
                  {s.size} (₹{s.price})
                </option>
              ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <button
        type="button"
        onClick={handleSavePlant}
        className="mb-4 bg-orange-500 text-black px-6 py-2 rounded-lg w-full md:w-auto"
      >
        ➕ Add Plant
      </button>

      {plantsList.length > 0 && (
        <div className="mb-4">
          <h4 className="font-bold text-orange-700 mb-2">🌱 Saved Plants</h4>
          <ul className="space-y-2">
            {plantsList.map((p, index) => (
              <li
                key={`${p.plantId}-${p.size}`}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
              >
                <span>
                  {p.plant} - {p.size} - {p.quantity} pcs = ₹{p.total}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePlant(index)}
                  className="ml-2 text-red-600 font-bold"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold text-lg text-right">
            Total Amount: ₹{totalAmount}
          </p>
        </div>
      )}

      <input
        type="number"
        placeholder="Paid"
        value={paid}
        onChange={(e) => setPaid(Number(e.target.value))}
        className="p-2 border rounded-lg w-full mb-4"
      />

      <button
        type="submit"
        className="bg-orange-500 text-black px-6 py-2 rounded-lg w-full md:w-auto"
      >
        Add Buyer
      </button>
    </form>
  );
};

export default BuyerForm;
