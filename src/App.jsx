import React, { useState, useCallback } from "react";

const JUMLAH_MAHASISWA = 10;
const JUMLAH_ASPEK = 4;

function generateInitialState() {
  const state = {};

  for (let a = 1; a <= JUMLAH_ASPEK; a++) {
    const aspekKey = `aspek_penilaian_${a}`;
    state[aspekKey] = {};

    for (let m = 1; m <= JUMLAH_MAHASISWA; m++) {
      state[aspekKey][`mahasiswa_${m}`] = 1;
    }
  }

  return state;
}

export default function App() {
  const [nilai, setNilai] = useState(generateInitialState);

  const handleChange = useCallback((aspek, mahasiswa, value) => {
    setNilai((prev) => ({
      ...prev,
      [aspek]: {
        ...prev[aspek],
        [mahasiswa]: Number(value),
      },
    }));
  }, []);

  const handleSubmit = () => {
    console.log(JSON.stringify(nilai, null, 2));
    alert("Cek console untuk melihat output JSON");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Aplikasi Penilaian Mahasiswa</h2>

      {Array.from({ length: JUMLAH_MAHASISWA }, (_, mIndex) => {
        const mahasiswaKey = `mahasiswa_${mIndex + 1}`;

        return (
          <div key={mahasiswaKey} style={{ marginBottom: 10 }}>
            <strong>Mahasiswa {mIndex + 1}</strong>

            {Array.from({ length: JUMLAH_ASPEK }, (_, aIndex) => {
              const aspekKey = `aspek_penilaian_${aIndex + 1}`;

              return (
                <select
                  key={aspekKey}
                  value={nilai[aspekKey][mahasiswaKey]}
                  onChange={(e) =>
                    handleChange(
                      aspekKey,
                      mahasiswaKey,
                      e.target.value
                    )
                  }
                  style={{ marginLeft: 10 }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              );
            })}
          </div>
        );
      })}

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Simpan
      </button>
    </div>
  );
}