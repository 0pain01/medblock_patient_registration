import React, { useState } from 'react';
import { usePGlite } from '@electric-sql/pglite-react';

export default function PatientForm() {
  const db = usePGlite();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhoneNo]=useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    await db.exec(`
      INSERT INTO patients (name, age, gender, email, phone)
      VALUES ('${name}', ${age}, '${gender}', '${email}', '${phone}')
    `);

    // Clear form
    setName('');
    setAge('');
    setGender('');
    setEmail('');
    setPhoneNo('');
    
  } catch (err) {
    // Check for UNIQUE constraint violation
    if (err.message.includes('unique')) {
      alert('Email or Phone number already exists.');
    } else {
      alert('An error occurred: ' + err.message);
    }
  }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Register Patients</h2>
      <div className='flex gap-2 mb-4'>
      <input className="border p-2 w-1/2 bg-gray-100" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="border p-2 w-1/2 bg-gray-100" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className='flex gap-2 mb-4'>
      <input className="border p-2 w-1/2 bg-gray-100" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input className="border p-2 w-1/2 bg-gray-100" placeholder="Phone Number" pattern='^[6-9][0-9]{9}$' title="Phone number must be 10 digits and start with 6, 7, 8, or 9" value={phone} onChange={(e) => setPhoneNo(e.target.value)} required />
      </div>
      <select className="border p-2 w-full" value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">Register</button>
    </form>
  );
}
