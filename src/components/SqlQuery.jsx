// src/components/SqlQuery.jsx
import React, { useState } from "react";
import { usePGlite } from '@electric-sql/pglite-react';

const SqlQuery = () => {
  const db = usePGlite();
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const forbiddenCommands = ["DROP", "ALTER"];

  const containsForbiddenSQL = (query) => {
    const upperQuery = query.toUpperCase();
    return forbiddenCommands.some((cmd) =>
      upperQuery.includes(cmd + " ")
    );
  };


  const runQuery = async () => {
    if (containsForbiddenSQL(sql)) {
        setError("⚠️ This query contains restricted SQL commands (DROP, ALTER).");
        setResults([]);
        return;
      }


    try {
      const res = await db.query(sql);
      setResults(res.rows);
      setError("");
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Run SQL Query</h2>
      <textarea
        rows={5}
        className="w-full bg-gray-100 border-solid border-black rounded-md p-3"
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        placeholder="Enter SQL query (e.g., SELECT * FROM patients);"
      />
      <button onClick={runQuery} className="bg-blue-500 text-white p-2 rounded" type="submit">
        Execute
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {results.length > 0 && (
        <table className="w-full border">
          <caption class="caption-top">
            Query output
          </caption>
          <thead className="bg-gray-300">
            <tr>
              {Object.keys(results[0]).map((col) => (
                <th className="border p-2" key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((val, i) => (
                  <td className="border p-2" key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SqlQuery;
