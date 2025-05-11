'use client';

import { useState } from 'react';

export default function Builder() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    productType: '',
    dosageForm: '',
    keyIngredients: '',
    targetClaims: '',
  });

  const steps = [
    {
      label: 'What type of product are you formulating?',
      name: 'productType',
      placeholder: 'e.g., Nootropic drink, Collagen capsule...',
    },
    {
      label: 'What is the dosage form?',
      name: 'dosageForm',
      placeholder: 'e.g., Powder stick, Gummy, Beverage...',
    },
    {
      label: 'Any key ingredients you want to include?',
      name: 'keyIngredients',
      placeholder: 'e.g., Ashwagandha, B12, Creatine...',
    },
    {
      label: 'What effects or claims are you targeting?',
      name: 'targetClaims',
      placeholder: 'e.g., Stress support, Energy, Skin health...',
    },
  ];

  const current = steps[step];

  const handleChange = (e) => {
    setForm({ ...form, [current.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Start a Product Profile</h1>
      <div className="border p-6 bg-white space-y-4 rounded-md shadow">
        <label className="block text-sm font-medium text-gray-900">
          {current.label}
        </label>
        <input
          type="text"
          name={current.name}
          placeholder={current.placeholder}
          value={form[current.name]}
          onChange={handleChange}
          className="w-full border px-3 py-2 text-sm rounded-md"
        />
        <div className="flex justify-between pt-2">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="text-sm text-gray-600 hover:underline disabled:opacity-30"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="text-sm text-blue-600 hover:underline"
            >
              Next
            </button>
          ) : (
            <div className="text-sm text-green-700">✓ Form complete</div>
          )}
        </div>
      </div>
    </div>
  );
}
