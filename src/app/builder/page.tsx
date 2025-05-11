
"use client";

import { useState } from "react";

type Question = {
  name: string;
  label: string;
  placeholder?: string;
};

type Phase = {
  name: string;
  questions: Question[];
};

const phases: Phase[] = [
  {
    name: "Product Overview",
    questions: [
      { name: "productName", label: "Product Name", placeholder: "e.g., Calm Elixir" },
      { name: "productType", label: "Product Type", placeholder: "e.g., Beverage, Tablet" },
      { name: "productFunction", label: "Product Function", placeholder: "e.g., Stress Relief" },
    ],
  },
  {
    name: "Target Audience",
    questions: [
      { name: "targetAudience", label: "Target Audience", placeholder: "e.g., Adults seeking relaxation" },
      { name: "lifestylePrefs", label: "Lifestyle Preferences", placeholder: "e.g., Vegan, Keto, Gluten-Free" },
    ],
  },
  {
    name: "Ingredient Priorities",
    questions: [
      { name: "mustHaveIngredients", label: "Must-Have Ingredients", placeholder: "e.g., Kava, L-Theanine" },
      { name: "brandedIngredients", label: "Preferred Branded Ingredients", placeholder: "e.g., Sensoril Ashwagandha" },
      { name: "targetClaims", label: "Desired Claims", placeholder: "e.g., Calm, Focused Energy" },
    ],
  },
  {
    name: "Form & Flavor",
    questions: [
      { name: "deliveryForm", label: "Delivery Form", placeholder: "e.g., 2oz shot, 12oz can, tablet" },
      { name: "dosageFrequency", label: "Dosage/Frequency", placeholder: "e.g., Once daily" },
      { name: "flavorProfile", label: "Flavor Profile", placeholder: "e.g., Hibiscus Ginger" },
      { name: "sweetenerRestrictions", label: "Sweetener Restrictions", placeholder: "e.g., No stevia" },
    ],
  },
  {
    name: "Commercialization",
    questions: [
      { name: "packagingType", label: "Packaging Type", placeholder: "e.g., Sleek Can, Blister Pack" },
      { name: "marketRegion", label: "Target Market Region", placeholder: "e.g., US, EU" },
      { name: "productionVolume", label: "Anticipated Production Volume", placeholder: "e.g., 10,000 units" },
    ],
  },
  {
    name: "Contact Information",
    questions: [
      { name: "name", label: "Your Name", placeholder: "e.g., Jane Doe" },
      { name: "company", label: "Company Name", placeholder: "e.g., Herbal Labs Inc." },
      { name: "email", label: "Email Address", placeholder: "e.g., jane@herballabs.com" },
      { name: "phone", label: "Phone Number", placeholder: "e.g., (123) 456-7890" },
    ],
  },
];

export default function BuilderPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (currentPhaseIndex < phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
    }
  };

  const handleSubmit = async () => {
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSubmitted(true);
  };

  const phase = phases[currentPhaseIndex];

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-xl font-semibold mb-4">Thank you!</h1>
        <p>Your product profile has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Start a Product Profile</h1>
      <p className="text-sm text-gray-500 mb-4">Step {currentPhaseIndex + 1} of {phases.length}</p>

      <h2 className="text-xl font-semibold mb-4">{phase.name}</h2>

      <form className="space-y-4">
        {phase.questions.map((q) => (
          <div key={q.name} className="flex flex-col">
            <label className="mb-1 font-medium">{q.label}</label>
            <input
              type="text"
              name={q.name}
              placeholder={q.placeholder}
              value={formData[q.name] || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            />
          </div>
        ))}
      </form>

      <div className="mt-6 flex justify-between">
        {currentPhaseIndex > 0 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {currentPhaseIndex < phases.length - 1 ? (
          <button
            onClick={handleNext}
            className="ml-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
