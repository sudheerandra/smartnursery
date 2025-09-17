import React, { useState, useContext } from "react";
import { NurseryContext } from "../context/NurseryContext";

const sizeOptions = [`4"x6"`, `6"x8"`, `8"x10"`, `12"x15"`];

const AdminPanel = () => {
  const { plants, addPlant, addSizeToPlant, updateSize } =
    useContext(NurseryContext);

  // 🔹 New Plant
  const [plantName, setPlantName] = useState("");
  const [sizes, setSizes] = useState([]);
  const [currentSize, setCurrentSize] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");

  // 🔹 Existing Plant
  const [existingPlantId, setExistingPlantId] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  // 🔹 Price & Quantity Inputs
  const [priceInputs, setPriceInputs] = useState({});
  const [quantityInputs, setQuantityInputs] = useState({});

  // ---------------- Handlers ----------------
  const handleAddSize = () => {
    if (!currentSize || !currentPrice || !currentQuantity) {
      ("⚠️ Select size, enter price & quantity");
      return;
    }
    if (sizes.some((s) => s.size === currentSize)) {
      alert("⚠️ Size already added");
      return;
    }
    setSizes((prev) => [
      ...prev,
      { size: currentSize, price: Number(currentPrice), quantity: Number(currentQuantity) },
    ]);
    setCurrentSize(""); setCurrentPrice(""); setCurrentQuantity("");
  };

  const handleAddPlant = (e) => {
    e.preventDefault();
    if (!plantName.trim() || sizes.length === 0) {
      alert("⚠️ Enter plant name and at least one size");
      return;
    }
    addPlant(plantName.trim(), sizes);
    setPlantName(""); setSizes([]); setCurrentSize(""); setCurrentPrice(""); setCurrentQuantity("");
  };

  const handleAddSizeToPlant = (e) => {
    e.preventDefault();
    if (!existingPlantId || !newSize || !newPrice || !newQuantity) {
      alert("⚠️ Select plant, size, price & quantity");
      return;
    }
    addSizeToPlant(existingPlantId, newSize, Number(newPrice), Number(newQuantity));
    setExistingPlantId(""); setNewSize(""); setNewPrice(""); setNewQuantity("");
  };

  const handleUpdatePrice = (plantId, size, oldQuantity) => {
    const newPrice = Number(priceInputs[`${plantId}-${size}`]);
    if (!newPrice || newPrice <= 0) {
      alert("⚠️ Enter a valid price");
      return;
    }
    updateSize(plantId, size, newPrice, oldQuantity);
    setPriceInputs((prev) => ({ ...prev, [`${plantId}-${size}`]: "" }));
  };

  const handleAddQuantity = (plantId, size, oldPrice, oldQuantity) => {
    const addQty = Number(quantityInputs[`${plantId}-${size}`]);
    if (!addQty || addQty <= 0) {
      alert("⚠️ Enter a valid quantity");
      return;
    }
    updateSize(plantId, size, oldPrice, oldQuantity + addQty);
    setQuantityInputs((prev) => ({ ...prev, [`${plantId}-${size}`]: "" }));
  };

  // ---------------- Render ----------------
  return (
    <div className="p-6 bg-green-100 rounded-lg shadow max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">⚙️ Admin Panel</h2>

      {/* New Plant */}
      <h3 className="font-bold mb-2">🌱 Add New Plant</h3>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          placeholder="Plant Name"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-4 flex-wrap">
        <select
          value={currentSize}
          onChange={(e) => setCurrentSize(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Size</option>
          {sizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          type="number" placeholder="Price" value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <input
          type="number" placeholder="Quantity" value={currentQuantity}
          onChange={(e) => setCurrentQuantity(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <button onClick={handleAddSize} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          ➕ Add Plant
        </button>
      </div>

      {sizes.length > 0 && (
        <div className="mb-4">
          <h4 className="font-bold mb-2">📝 Preview (Before Save)</h4>
          <table className="min-w-full border border-blue-300 text-sm bg-blue-50">
            <thead className="bg-blue-200">
              <tr>
                <th className="border px-4 py-2">Plant</th>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((s,i) => (
                <tr key={i} className="text-center">
                  <td className="border px-4 py-2">{plantName}</td>
                  <td className="border px-4 py-2">{s.size}</td>
                  <td className="border px-4 py-2">₹{s.price}</td>
                  <td className="border px-4 py-2">{s.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={handleAddPlant} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-8">
        🌱 Save Plant
      </button>

      {/* Add Size to Existing Plant */}
      <div className="p-4 border rounded bg-yellow-50 mb-8">
        <h3 className="font-bold mb-2">➕ Add Size to Existing Plant</h3>
        <div className="flex flex-col md:flex-row gap-2 flex-wrap">
          <select value={existingPlantId} onChange={(e)=>setExistingPlantId(e.target.value)} className="border p-2 rounded">
            <option value="">Select Plant</option>
            {plants.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <select value={newSize} onChange={(e)=>setNewSize(e.target.value)} className="border p-2 rounded">
            <option value="">Select Size</option>
            {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="number" placeholder="Price" value={newPrice} onChange={e=>setNewPrice(e.target.value)} className="border p-2 rounded w-24"/>
          <input type="number" placeholder="Quantity" value={newQuantity} onChange={e=>setNewQuantity(e.target.value)} className="border p-2 rounded w-24"/>
          <button onClick={handleAddSizeToPlant} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">➕ Add Plant</button>
        </div>
      </div>

      {/* Plants Table */}
      <h3 className="font-bold mb-2">🌱 Plants & Stock</h3>
      <table className="min-w-full border border-green-300 text-sm bg-green-50">
        <thead className="bg-green-200">
          <tr>
            <th className="border px-4 py-2">Plant</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Update Price / Add Quantity</th>
          </tr>
        </thead>
        <tbody>
          {[...plants].reverse().map(plant =>
            plant.sizes.map((s,i) => (
              <tr key={`${plant._id}-${i}`} className="text-center">
                <td className="border px-4 py-2 font-semibold">{plant.name}</td>
                <td className="border px-4 py-2">{s.size}</td>
                <td className="border px-4 py-2">₹{s.price}</td>
                <td className="border px-4 py-2">{s.quantity}</td>
                <td className="border px-4 py-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                  <input
                    type="number"
                    placeholder="₹ New Price"
                    min="1"
                    value={priceInputs[`${plant._id}-${s.size}`] || ""}
                    onChange={(e)=>setPriceInputs(prev=>({...prev, [`${plant._id}-${s.size}`]: e.target.value}))}
                    className="border p-1 rounded w-24"
                  />
                  <button onClick={()=>handleUpdatePrice(plant._id, s.size, s.quantity)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">💰 Update Price</button>

                  <input
                    type="number"
                    placeholder="Add Qty"
                    min="1"
                    value={quantityInputs[`${plant._id}-${s.size}`] || ""}
                    onChange={(e)=>setQuantityInputs(prev=>({...prev, [`${plant._id}-${s.size}`]: e.target.value}))}
                    className="border p-1 rounded w-24"
                  />
                  <button onClick={()=>handleAddQuantity(plant._id, s.size, s.price, s.quantity)} className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600">➕ Add Qty</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
