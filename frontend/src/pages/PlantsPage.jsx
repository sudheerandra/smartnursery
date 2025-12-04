import React from "react";
import NurseryForm from "../components/NusureyForm";
import NurseryTable from "../components/NurseryTable";

const PlantsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-4">
          <p className="text-sm text-gray-600 mt-1">
            Add plants — owner details, sizes, price.
          </p>
        </header>
        <main className="space-y-6">
          {/* Form (top) */}
          <NurseryForm />
          {/* Table (below form) */}
          <NurseryTable />
        </main>
        <footer className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Nursery App
        </footer>
      </div>
    </div>
  );
};

export default PlantsPage;
