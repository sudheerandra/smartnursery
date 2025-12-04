import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const ALL_SIZES = [
  "4X5",
  "5X6",
  "6X6",
  "6X8",
  "7X7",
  "8X8",
  "8X10",
  "10X10",
  "12X12",
];

const NurseryForm = () => {
  // owner fields
  const [ownerName, setOwnerName] = useState("");
  const [ownerNumber, setOwnerNumber] = useState("");

  // plant fields
  const [plantName, setPlantName] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [customSize, setCustomSize] = useState("");

  // UI state
  const [keepOwner, setKeepOwner] = useState(true); // keep owner info after save
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  // toggle selection/add/remove sizes
  const toggleSize = (s) => {
    setSizes((prev) =>
      prev.some((x) => x.toLowerCase() === s.toLowerCase())
        ? prev.filter((x) => x.toLowerCase() !== s.toLowerCase())
        : [...prev, s]
    );
  };

  const addCustomSize = () => {
    const s = (customSize || "").trim();
    if (!s) return;
    if (sizes.some((x) => x.toLowerCase() === s.toLowerCase())) {
      setError("Size already added.");
      setTimeout(() => setError(null), 2000);
      return;
    }
    setSizes((prev) => [...prev, s]);
    setCustomSize("");
  };

  const removeSize = (s) => {
    setSizes((prev) => prev.filter((x) => x.toLowerCase() !== s.toLowerCase()));
  };

  const selectAll = () => setSizes([...ALL_SIZES]);
  const clearAll = () => setSizes([]);

  // reset strategies
  const resetPlantFields = () => {
    setPlantName("");
    setPrice("");
    setSizes([]);
    setCustomSize("");
    setMsg(null);
    setError(null);
  };

  const resetAll = () => {
    setOwnerName("");
    setOwnerNumber("");
    resetPlantFields();
  };

  // validation
  const validate = () => {
    if (!ownerName.trim()) return "Please enter nursery owner name.";
    if (!ownerNumber.trim()) return "Please enter nursery owner number.";
    if (!plantName.trim()) return "Please enter plant name.";
    if (price === "" || Number.isNaN(Number(price)))
      return "Please enter a valid price.";
    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMsg(null);
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        nurseryOwnerName: ownerName,
        nurseryOwnerNumber: ownerNumber,
        plantName,
        price: Number(price),
        sizes,
      };

      await axios.post(`${backendUrl}/api/nurseries`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMsg("Saved successfully.");

      // Keep or clear owner fields according to keepOwner
      if (keepOwner) {
        // only clear plant-related fields so you can add another plant for same owner
        resetPlantFields();
      } else {
        // clear everything (owner + plant)
        resetAll();
      }

      // notify table to refresh
      window.dispatchEvent(new Event("nursery:created"));
    } catch (err) {
      console.error("Save error:", err);
      const remote = err?.response?.data?.message;
      setError(remote || "Failed to save. Check backend and console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
    >
      <div className="grid grid-cols-1 gap-3">
        {/* Owner name */}
        <label className="block">
          <span className="text-sm text-gray-700">Nursery Owner Name</span>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="mt-1 block w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="e.g. Ramesh Nursery"
            required
          />
        </label>

        {/* Owner number */}
        <label className="block">
          <span className="text-sm text-gray-700">Owner Phone / Number</span>
          <input
            type="tel"
            value={ownerNumber}
            onChange={(e) => setOwnerNumber(e.target.value)}
            className="mt-1 block w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="+91-9876543210"
            required
          />
        </label>

        {/* Keep owner toggle + Clear owner button */}
        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={keepOwner}
              onChange={(e) => setKeepOwner(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">
              Keep owner info after save
            </span>
          </label>

          <button
            type="button"
            onClick={() => {
              setOwnerName("");
              setOwnerNumber("");
            }}
            className="text-xs text-red-600 hover:underline"
          >
            Clear owner
          </button>
        </div>

        {/* Plant name */}
        <label className="block">
          <span className="text-sm text-gray-700">Plant Name</span>
          <input
            type="text"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            className="mt-1 block w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="e.g. Snake plant"
            required
          />
        </label>

        {/* Price */}
        <label className="block">
          <span className="text-sm text-gray-700">Price (₹)</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="e.g. 250"
            min="0"
            required
          />
        </label>

        {/* Sizes controls */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">
              Sizes (choose or add custom)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAll}
                className="text-xs text-green-600 hover:underline"
              >
                Select all
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-red-600 hover:underline"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* checkbox grid */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {ALL_SIZES.map((s) => (
              <label
                key={s}
                className="inline-flex items-center space-x-2 p-2 border border-gray-100 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={sizes.some(
                    (x) => x.toLowerCase() === s.toLowerCase()
                  )}
                  onChange={() => toggleSize(s)}
                  className="h-4 w-4"
                />
                <span className="text-sm">{s}</span>
              </label>
            ))}
          </div>

          {/* custom size input */}
          <div className="mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
            <input
              type="text"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomSize();
                }
              }}
              className="flex-1 border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
              placeholder="Type custom size (e.g. 9X9)"
            />

            <button
              type="button"
              onClick={addCustomSize}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm whitespace-nowrap"
            >
              Add
            </button>
          </div>

          {/* selected sizes chips */}
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <div
                key={s}
                className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{s}</span>
                <button
                  type="button"
                  onClick={() => removeSize(s)}
                  className="text-xs text-gray-500 hover:text-red-600"
                >
                  &times;
                </button>
              </div>
            ))}
            {sizes.length === 0 && (
              <div className="text-xs text-gray-400">No sizes selected</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>

          <button
            type="button"
            onClick={() => {
              // if user wants to start completely fresh with a new owner
              resetAll();
            }}
            className="px-3 py-2 border rounded-md text-sm"
          >
            Reset All
          </button>
        </div>

        {/* messages */}
        {msg && <div className="text-sm text-green-700">{msg}</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>
    </form>
  );
};

export default NurseryForm;
