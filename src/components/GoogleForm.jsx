import { useState } from 'react';

const GoogleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    facebookId: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    if (!formData.facebookId) tempErrors.facebookId = 'Facebook ID link is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      // handle form submission
      const res = await fetch('https://student-list-flame.vercel.app/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setFormData({
        name: '',
        phone: '',
        facebookId: ''
      });

      if(data.acknowledged) {
        alert('Form submitted successfully');
      }
      console.log(data);
      console.log('Form submitted successfully', formData);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-4">দেশ সংস্কার আন্দোলন</h1>
      <p className="mb-2 font-semibold text-red-900">ইন্টারনেট বন্ধ হয়ে গেলে আপনাদের দেওয়া নাম্বার এ কর্মসূচী আপডেট জানিয়ে দেওয়া হবে </p>
      <p className="mb-2 font-bold text-red-900">আপনার তথ্য
       শুধু অ্যাডমিন দেখতে পারবে </p>
      <p className="mb-2 text-sm text-red-900">*ছাত্রলীগ দূরে থাক </p>
      <p className="mb-2 text-sm text-red-900">*সঠিক তথ্য দিয়ে সহায়তা করুন </p>
      <p className="mb-6 text-sm text-red-900">*টোকাই লীগ কে বয়কট করুন  </p>
      <p className="text-gray-600 mb-6">Please fill out the form below.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Facebook ID Link</label>
          <input
            type="url"
            name="facebookId"
            value={formData.facebookId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.facebookId && <span className="text-red-500 text-sm">{errors.facebookId}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GoogleForm;
