import React, { useContext, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { NurseryContext } from "../context/NurseryContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#3B82F6"];
const currency = (num) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    num
  );

const Dashboard = () => {
  const { buyers, workers, fetchBuyers, fetchWorkers } =
    useContext(NurseryContext);

  useEffect(() => {
    fetchBuyers();
    fetchWorkers();
  }, []);

  // 🔹 Summary calculations
  const summary = useMemo(() => {
    const totalBuyers = buyers.length;
    const totalWorkers = workers.length;

    // Buyers
    const totalRevenue = buyers.reduce((sum, b) => sum + (b.total || 0), 0);
    const totalReceived = buyers.reduce((sum, b) => sum + (b.paid || 0), 0);
    const totalPendingRevenue = totalRevenue - totalReceived;

    // Workers
    const totalSalary = workers.reduce((sum, w) => sum + (w.salary || 0), 0);
    const totalPaidSalary = workers.reduce((sum, w) => sum + (w.paid || 0), 0);
    const totalPendingSalary = totalSalary - totalPaidSalary;

    // Owner Revenue = Buyer Paid - Worker Paid
    const ownerRevenue = totalReceived - totalPaidSalary;

    return {
      totalBuyers,
      totalWorkers,
      totalRevenue,
      totalReceived,
      totalPendingRevenue,
      totalSalary,
      totalPaidSalary,
      totalPendingSalary,
      ownerRevenue,
    };
  }, [buyers, workers]);

  // 🔹 Chart data
  const revenuePieData = [
    { name: "Received", value: summary.totalReceived },
    { name: "Pending", value: summary.totalPendingRevenue },
  ];

  const salaryPieData = [
    { name: "Paid", value: summary.totalPaidSalary },
    { name: "Unpaid", value: summary.totalPendingSalary },
  ];

  // 🔹 Monthly trend (buyers)
  const monthlyData = buyers.reduce((acc, b) => {
    // Convert createdAt into month name
  const month = b.createdAt ? dayjs(b.createdAt).format("MMMM") : "Unknown";
    if (!acc[month]) acc[month] = { month, total: 0, paid: 0 };
    acc[month].total += b.total || 0;
    acc[month].paid += b.paid || 0;
    return acc;
  }, {});
  const barData = Object.values(monthlyData);

  return (
    <div className="p-6">
      <motion.h2
        className="text-2xl font-bold text-orange-700 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📊 Dashboard
      </motion.h2>

      {/* 🔹 Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Buyers */}
        <motion.div
          className="bg-white shadow rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-gray-500">Buyer Revenue</h4>
          <p className="text-green-600 font-bold">
            Total: {currency(summary.totalRevenue)}
          </p>
          <p className="text-blue-600 font-bold">
            Paid: {currency(summary.totalReceived)}
          </p>
          <p className="text-red-500 font-bold">
            Pending: {currency(summary.totalPendingRevenue)}
          </p>
        </motion.div>

        {/* Workers */}
        <motion.div
          className="bg-white shadow rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="text-gray-500">Worker Salaries</h4>
          <p className="text-red-600 font-bold">
            Total: {currency(summary.totalSalary)}
          </p>
          <p className="text-green-600 font-bold">
            Paid: {currency(summary.totalPaidSalary)}
          </p>
          <p className="text-orange-500 font-bold">
            Pending: {currency(summary.totalPendingSalary)}
          </p>
        </motion.div>

        {/* Owner Revenue */}
        <motion.div
          className="bg-white shadow rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-gray-500">Owner Revenue</h4>
          <p
            className={`text-xl font-bold ${
              summary.ownerRevenue >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {currency(summary.ownerRevenue)}
          </p>
          <p className="text-sm text-gray-500">
            {summary.ownerRevenue >= 0 ? "Profit" : "Loss"}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="bg-white shadow rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-gray-500">Stats</h4>
          <p className="font-bold text-blue-600">
            Buyers: {summary.totalBuyers}
          </p>
          <p className="font-bold text-purple-600">
            Workers: {summary.totalWorkers}
          </p>
        </motion.div>
      </div>

      {/* 🔹 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Pie */}
        <div className="bg-white shadow rounded-xl p-6">
          <h4 className="font-bold text-lg text-center mb-4">💰 Revenue Status</h4>
          {summary.totalRevenue > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenuePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  dataKey="value"
                >
                  {revenuePieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400">No revenue data</p>
          )}
        </div>

        {/* Salary Pie */}
        <div className="bg-white shadow rounded-xl p-6">
          <h4 className="font-bold text-lg text-center mb-4">👷 Salary Payments</h4>
          {summary.totalSalary > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={salaryPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  dataKey="value"
                >
                  {salaryPieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index + 2]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400">No salary data</p>
          )}
        </div>
      </div>

      {/* 🔹 Monthly Trend */}
      <div className="bg-white shadow rounded-xl p-6 mt-6">
        <h4 className="font-bold text-lg text-center mb-4">
          📅 Monthly Buyer Payments
        </h4>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#F59E0B" name="Total" />
              <Bar dataKey="paid" fill="#10B981" name="Paid" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-400">No monthly data</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
