import "./ApartmentsList.css";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import apartments from '../../data/apartmentsData';

export default function ApartmentsList() {
  

  return (
    <main className="main-content">
      <h2 className="section-title">Featured Properties</h2>
      <div className="apartments-list">
        {apartments.map((apt) => (
          <ApartmentCard key={apt.id} {...apt} />
        ))}
      </div>
    </main>
  );
}
