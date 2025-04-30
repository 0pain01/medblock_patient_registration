import React from 'react';
import { PGliteProvider } from '@electric-sql/pglite-react'; 
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import SqlQuery from './components/SqlQuery';
import db from './db/pgliteClient';

export default function App() {
  return (
    <div className="container mx-auto px-8 py-10 bg-black-200">
        <h1 className="flex items-center justify-center text-5xl font-bold font-serif">PATIENT REGISTRATION</h1>
        <div className="container mx-auto px-8 py-10">
        <PGliteProvider db={db}>
          <div className="flex flex-col lg:flex-row gap-3 py-4">
            <div className='w-full lg:w-1/2'>
              <PatientForm />
            </div>
            <div className='w-full lg:w-1/2'>
              <PatientList />
            </div>
          </div>
          <div className='w-full'>
              <SqlQuery/>
          </div>
          
        </PGliteProvider>
        </div>
      </div>
  );
}