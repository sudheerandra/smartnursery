import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const NurseryTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyMsg, setEmptyMsg] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setEmptyMsg("");
    try {
      const res = await axios.get(`${backendUrl}/api/nurseries`);
      const data = res.data || [];
      setRows(data);
      if (!data.length) setEmptyMsg("No entries yet. Add a plant above.");
    } catch (err) {
      console.error("Fetch error:", err);
      setRows([]);
      setEmptyMsg("Failed to fetch entries. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const onCreated = () => fetchData();
    window.addEventListener("nursery:created", onCreated);
    return () => window.removeEventListener("nursery:created", onCreated);
  }, []);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <section className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <h3 className="text-md font-medium mb-3">Nursery Entries</h3>

      {loading ? (
        <div className="text-sm text-gray-600">Loading...</div>
      ) : rows.length === 0 ? (
        <div className="text-sm text-gray-600">{emptyMsg}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Owner</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Plant</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Sizes</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r._id} className="border-b last:border-0">
                  <td className="py-2 pr-4 align-top">{formatDate(r.createdAt)}</td>
                  <td className="py-2 pr-4 align-top">{r.nurseryOwnerName || r.nurseryOwner || "-"}</td>
                  <td className="py-2 pr-4 align-top">{r.nurseryOwnerNumber || "-"}</td>
                  <td className="py-2 pr-4 align-top">{r.plantName}</td>
                  <td className="py-2 pr-4 align-top">₹ {r.price}</td>
                  <td className="py-2 pr-4 align-top">{(r.sizes || []).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default NurseryTable;
