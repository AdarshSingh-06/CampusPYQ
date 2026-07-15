import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import API from "../services/api";

function Pyq(){

const {subjectId}=useParams();

const [pyqs,setPyqs]=useState([]);
const [search,setSearch]=useState("");
const [year,setYear]=useState("All");

useEffect(()=>{

API.get(`/pyqs/subject/${subjectId}`)
.then(res=>setPyqs(res.data))
.catch(console.log);

},[subjectId]);

const years=[...new Set(pyqs.map(p=>p.year))];

const filtered=pyqs.filter(pyq=>{

const matchTitle=pyq.title.toLowerCase().includes(search.toLowerCase());

const matchYear=year==="All" || pyq.year===parseInt(year);

return matchTitle && matchYear;

});

return(

<div className="page">

<h1>📄 Previous Year Papers</h1>

<div className="search-box">

<FaSearch className="search-icon"/>

<input
placeholder="Search Paper..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<div style={{textAlign:"center",marginBottom:"25px"}}>

<select
value={year}
onChange={(e)=>setYear(e.target.value)}
style={{
padding:"12px",
borderRadius:"8px",
fontSize:"16px"
}}
>

<option>All</option>

{

years.map(y=>

<option key={y}>{y}</option>

)

}

</select>

</div>

{

filtered.length === 0 ? (

<div className="empty-state">

<div className="empty-icon">📂</div>

<h2>No Question Papers Available</h2>

<p>Upload Coming Soon...</p>

</div>

) : (

filtered.map((pyq) => (

<div className="card fade" key={pyq.id}>

<h2>{pyq.title}</h2>
<span></span>

<p><b>Year :</b> {pyq.year}</p>

<div className="pyq-buttons">

<a
href={`http://localhost:8080/api/pyqs/view/${pyq.id}`}
target="_blank"
rel="noreferrer"
>
<button className="view-btn">
👁 View PDF
</button>
</a>

<a
href={`http://localhost:8080/api/pyqs/download/${pyq.id}`}
target="_blank"
rel="noreferrer"
>
<button className="download-btn">
⬇ Download PDF
</button>
</a>

</div>

</div>

))

)

}

</div>

);

}

export default Pyq;