// frontend/src/components/CreateCampaignForm.tsx

import React, { useState } from 'react';
import axios from 'axios';

const CreateCampaignForm: React.FC = () => {
  const [name, setName] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [displayHours, setDisplayHours] = useState('');
  const [status, setStatus] = useState('active');
  const [url, setUrl] = useState('');
  const [advertiserId, setAdvertiserId] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('budget_max', budgetMax);
      formData.append('begin_date', beginDate);
      formData.append('end_date', endDate);
      formData.append('display_hours', displayHours);
      formData.append('status', status);
      formData.append('url', url);
      formData.append('advertiser_id', advertiserId);
      if (file) {
        formData.append('file', file);
      }

      const response = await axios.post('http://localhost:3000/campaigns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      resetForm();
      alert('Campaign created successfully!');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign. Please try again later.');
    }
  };

  const resetForm = () => {
    setName('');
    setBudgetMax('');
    setBeginDate('');
    setEndDate('');
    setDisplayHours('');
    setStatus('active');
    setUrl('');
    setAdvertiserId('');
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Budget Max:
        <input type="number" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} required />
      </label>
      <br />
      <label>
        Begin Date:
        <input type="date" value={beginDate} onChange={(e) => setBeginDate(e.target.value)} required />
      </label>
      <br />
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </label>
      <br />
      <label>
        Display Hours:
        <input type="number" value={displayHours} onChange={(e) => setDisplayHours(e.target.value)} required />
      </label>
      <br />
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <br />
      <label>
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </label>
      <br />
      <label>
        Advertiser ID:
        <input type="text" value={advertiserId} onChange={(e) => setAdvertiserId(e.target.value)} required />
      </label>
      <br />
      <label>
        File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Create Campaign</button>
    </form>
  );
};

export default CreateCampaignForm;