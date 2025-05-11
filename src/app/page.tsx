export default function Home() {
  return (
    <div className="space-y-6">
      <p className="text-lg">
        Honey Provisions is a minimalist product formulation consultancy. We develop custom formulas for functional beverages, capsules, powders, and skincare.
      </p>
      <div className="border-l-2 pl-4 space-y-4">
        <div className="border p-4 bg-white">
          <h2 className="font-semibold mb-1">🧪 Start a Product Profile</h2>
          <p className="text-sm text-gray-700">
            Answer a few quick questions to generate a scope of work.
          </p>
        </div>
        <div className="border p-4 bg-white">
          <h2 className="font-semibold mb-1">💡 Services</h2>
          <p className="text-sm text-gray-700">
            Concept-to-market formulation for DTC and CPG brands.
          </p>
        </div>
      </div>
    </div>
  );
}