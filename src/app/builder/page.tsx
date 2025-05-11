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

export default function Page() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (currentPhaseIndex < phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const handleBack = () => {
    if (isReviewing) {
      setIsReviewing(false);
    } else if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setStatus('sending');
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setSubmitted(true);
      } else {
        throw new Error("Send failed");
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const labelMap = Object.fromEntries(phases.flatMap(p => p.questions.map(q => [q.name, q.label])));

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-xl font-semibold mb-4">Thank you!</h1>
        <p>Your product profile has been submitted.</p>
      </div>
    );
  }

  if (isReviewing) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Review & Submit</h1>
        <div className="space-y-3 text-sm">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="border-b pb-2">
              <span className="font-medium">{labelMap[key] || key}:</span> {value || <span className="italic text-gray-400">No answer</span>}
            </div>
          ))}
        </div>
        <div className="pt-6 flex justify-between">
          <button onClick={handleBack} className="px-4 py-2 bg-gray-200 rounded text-sm">
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={status === 'sending' || status === 'success'}
            className="px-4 py-2 bg-black text-white rounded text-sm"
          >
            {status === 'sending' ? 'Sending…' : 'Submit'}
          </button>
        </div>
      </div>
    );
  }

  const phase = phases[currentPhaseIndex];

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
        <button
          onClick={handleBack}
          disabled={currentPhaseIndex === 0}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 text-sm"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="ml-auto px-4 py-2 bg-black text-white rounded text-sm"
        >
          {currentPhaseIndex === phases.length - 1 ? 'Review' : 'Next'}
        </button>
      </div>
    </div>
  );
}
