import React ,{ useEffect, useState }from 'react';
import { usePGlite} from '@electric-sql/pglite-react';

export default function PatientList() {
  const db = usePGlite();
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    if (!db) return; // ⛔ Don't run if db isn't ready
    const result = await db.query('SELECT * FROM patients');
    setPatients(result.rows);
  };

  useEffect(() => {
    fetchPatients();
    const intervalId = setInterval(fetchPatients, 2000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]); // ✅ Add db as a dependency

  if (!db) return null;
  return (
    <div>
      <div className='flex justify-between'>
      <h2 className="text-xl font-semibold mb-2">Registered Patients</h2>
      <h3 className='text-xl italic'>Table name: patients</h3>
      </div>
      
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Gender</th>
            <th className='border p-2'>Email</th>
            <th className='border'>phone no.</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.age}</td>
              <td className="border p-2">{p.gender}</td>
              <td className="border p-2">{p.email}</td>
              <td className="border p-2">{p.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}