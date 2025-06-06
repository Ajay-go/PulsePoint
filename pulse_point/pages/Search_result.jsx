import { useLocation } from "react-router-dom";
import Doc_tile from "../components/doctor_tiles";
const SearchResultsPage = () => {
  const location = useLocation();
  const doctorResults = location.state?.results || [];
  while(doctorResults.length > 5)doctorResults.pop();
   
  return (
    <div>
      {doctorResults.length === 0 ? (
  <p>No doctors or speaciality found matching your search.</p>
) : (
  doctorResults.map((doc, index) => (
    <Doc_tile
      key={index}
      name={doc.name}
      speciality={doc.speciality}
      img_url={doc.img_src}
      expirience={doc.experience_years}
    />
  ))
)}

    </div>
  );
};

export default SearchResultsPage;
