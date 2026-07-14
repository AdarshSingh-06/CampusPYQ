import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Branch() {

  const [branches, setBranches] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/branches")
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredBranches = branches.filter((branch) =>
    branch.branchName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">

      <h1>🎓 Select Your Branch</h1>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Branch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {filteredBranches.length === 0 ? (

        <p>No Branch Found</p>

      ) : (

        filteredBranches.map((branch) => (

         <div
key={branch.id}
className="card branch-card fade"
            onClick={() =>
              navigate(`/branches/${branch.id}/semesters`)
            }
          >

           <div>

<h2>{branch.branchName}</h2>
<span></span>

<p>View Semester Papers</p>

</div>

<span>📚</span>

          </div>

        ))

      )}

    </div>
  );
}

export default Branch;