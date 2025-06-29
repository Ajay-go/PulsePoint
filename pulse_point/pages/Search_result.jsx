import { useLocation } from "react-router-dom";
import Doc_tile from "../components/doctor_tiles";
import './search_result.css'
const SearchResultsPage = () => {
  const location = useLocation();
  const doctorResults = location.state?.results || [];
  while(doctorResults.length > 5)doctorResults.pop();
   
  return (
    <>

      <div id="search_result">
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
            location = {doc.location}
          />
        ))
      )}

      </div>

      <div
        style={{
          backgroundColor: '#f05f70',color: 'white',textAlign: 'center',padding: '10px 0',fontSize: '0.9rem',width: '100%',position: 'relative',bottom: '0',left: '0',borderRadius: '0',marginTop: '40px',fontFamily: 'Arial, sans-serif'
        }}
      >
        &copy; {new Date().getFullYear()} Pulse Point
      </div>
    </>
  );
};

export default SearchResultsPage;
