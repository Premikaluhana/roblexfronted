import React, { useState } from 'react';
import { createPromoCode } from '../utlis/Api';

const PromoCodeForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    robloxCoins: '',
    expirationDate: '',
    usageLimit: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    // Validate inputs
    if (!formData.code || !formData.robloxCoins || !formData.expirationDate || !formData.usageLimit) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Prepare data with correct types
    const promoCodeData = {
      code: formData.code.trim(),
      robloxCoins: Number(formData.robloxCoins),
      expirationDate: new Date(formData.expirationDate).toISOString(),
      usageLimit: Number(formData.usageLimit),
    };

    try {
      await createPromoCode(promoCodeData);
      setSuccessMessage('Promo code created successfully.');
      setFormData({
        code: '',
        robloxCoins: '',
        expirationDate: '',
        usageLimit: '',
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Failed to create promo code.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#181d35] p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Create Promo Code</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col text-white">
          Code:
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white"
            required
          />
        </label>
        <label className="flex flex-col text-white">
          Roblox Coins:
          <input
            type="number"
            name="robloxCoins"
            value={formData.robloxCoins}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white"
            min="1"
            required
          />
        </label>
        <label className="flex flex-col text-white">
          Expiration Date:
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white"
            required
          />
        </label>
        <label className="flex flex-col text-white">
          Usage Limit:
          <input
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-700 text-white"
            min="1"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Promo Code'}
        </button>
      </form>
    </div>
  );
};

export default PromoCodeForm;
 