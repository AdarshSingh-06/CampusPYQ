import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Pyq() {

  const { subjectId } = useParams();

  const [pyqs, setPyqs] = useState([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All");

  const BACKEND_URL = "https://campuspyq.onrender.com";

  useEffect(() => {

    API.get(`/pyqs/subject/${subjectId}`)
      .then((res) => setPyqs(res.data))
      .catch(console.error);

  }, [subjectId]);

  // Download Function
  const downloadPdf = (id) => {

    const link = document.createElement("a");

    link.href = `${BACKEND_URL}/api/pyqs/download/${id}`;

    link.download = "";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  const years = [...new Set(pyqs.map((p) => p.year))];

  const filtered = pyqs.filter((pyq) => {

    const matchTitle = pyq.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchYear =
      year === "All" || pyq.year === Number(year);

    return matchTitle && matchYear;

  });

  return (

    <div className="page">

      <h1>📄 Previous Year Papers</h1>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Paper..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >

          <option value="All">All</option>

          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}

        </select>

      </div>

      {filtered.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">📂</div>

          <h2>No Question Papers Available</h2>

          <p>Upload Coming Soon...</p>

        </div>

      ) : (

        filtered.map((pyq) => (

          <div
            className="card fade"
            key={pyq.id}
          >

            <h2>{pyq.title}</h2>

            <p>
              <b>Year :</b> {pyq.year}
            </p>

            <div className="pyq-buttons">

           <a
  href={`${BACKEND_URL}/api/pyqs/view/${pyq.id}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="view-btn">
    👁 View PDF
  </button>
</a>
 <a
  href={`${BACKEND_URL}/api/pyqs/download/${pyq.id}`}
>
  <button className="download-btn">
    ⬇ Download PDF
  </button>
</a>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default Pyq;