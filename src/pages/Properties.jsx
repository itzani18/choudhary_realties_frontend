// frontend/src/pages/Properties.jsx
import { useEffect, useState, useRef } from "react";
import { api } from "../api";
import PropertyCard from "../components/PropertyCard";
import Loader from "../components/Loader";

function EmptyState(){
  return (
    <div className="card p-5 text-center">
      <img src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-2501.jpg?w=740&t=st=1699999999~exp=1699999999~hmac=placeholder" alt="No results" style={{maxWidth:260}} />
      <h4 className="mt-3">No properties found</h4>
      <p className="text-muted">Try resetting filters or add some listings from admin.</p>
    </div>
  );
}

export default function Properties(){
  const [allProps, setAllProps] = useState([]);
  const [visible, setVisible] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [pageSize] = useState(9);
  const [page, setPage] = useState(1);
  const searchTimer = useRef(null);

  useEffect(()=> load(), []);

  useEffect(()=> {
    if(searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(()=> {
      applyFilters();
      setPage(1);
    }, 300);
    return ()=> clearTimeout(searchTimer.current);
  }, [query, priceSort, propertyType, bedrooms, allProps]);

  function load(){
    setLoading(true);
    api.get("properties/").then(r => {
      setAllProps(r.data || []);
    }).catch(console.error).finally(()=> setLoading(false));
  }

  function applyFilters(){
    let items = [...allProps];
    if(query && query.trim()){
      const q = query.trim().toLowerCase();
      items = items.filter(p => (p.title||'').toLowerCase().includes(q) || (p.location||'').toLowerCase().includes(q));
    }
    if(propertyType) items = items.filter(p => (p.property_type||'').toLowerCase() === propertyType.toLowerCase());
    if(bedrooms) items = items.filter(p => Number(p.bedrooms) === Number(bedrooms));
    if(priceSort === "low") items.sort((a,b)=> Number(a.price)-Number(b.price));
    if(priceSort === "high") items.sort((a,b)=> Number(b.price)-Number(a.price));
    setVisible(items.slice(0, pageSize));
  }

  function loadMore(){
    const next = page + 1;
    const start = (next-1)*pageSize;
    const end = start + pageSize;
    const items = computeFiltered();
    setVisible(prev => [...prev, ...items.slice(start, end)]);
    setPage(next);
  }

  function computeFiltered(){
    let items = [...allProps];
    if(query && query.trim()){
      const q = query.trim().toLowerCase();
      items = items.filter(p => (p.title||'').toLowerCase().includes(q) || (p.location||'').toLowerCase().includes(q));
    }
    if(propertyType) items = items.filter(p => (p.property_type||'').toLowerCase() === propertyType.toLowerCase());
    if(bedrooms) items = items.filter(p => Number(p.bedrooms) === Number(bedrooms));
    if(priceSort === "low") items.sort((a,b)=> Number(a.price)-Number(b.price));
    if(priceSort === "high") items.sort((a,b)=> Number(b.price)-Number(a.price));
    return items;
  }

  useEffect(()=> {
    const items = computeFiltered();
    setVisible(items.slice(0, pageSize));
    setPage(1);
    // eslint-disable-next-line
  }, [allProps]);

  if(loading) return <Loader />;

  const items = computeFiltered();
  const canLoadMore = visible.length < items.length;

  // derive filters values
  const types = Array.from(new Set(allProps.map(p=>p.property_type).filter(Boolean)));
  const beds = Array.from(new Set(allProps.map(p=>p.bedrooms).filter(v => v !== undefined && v !== null))).sort((a,b)=>a-b);

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-4">
        <div style={{flex:1}}>
          <h2 className="fw-bold mb-1">All Properties</h2>
          <p className="text-muted mb-0">Browse verified listings — filter to narrow your search.</p>
        </div>

        <div style={{minWidth:320}} className="d-flex gap-2">
          <input className="form-control" placeholder="Search by title or location" value={query} onChange={e=>setQuery(e.target.value)} />
          <select className="form-control" value={priceSort} onChange={e=>setPriceSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
          <button className="btn btn-outline-secondary" onClick={() => { setQuery(""); setPriceSort(""); setPropertyType(""); setBedrooms(""); setVisible(allProps.slice(0,pageSize)); setPage(1); }}>
            Reset
          </button>
        </div>
      </div>

      <div className="card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="text-muted small">Property type</label>
            <select className="form-control" value={propertyType} onChange={e=>setPropertyType(e.target.value)}>
              <option value="">Any</option>
              {types.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="col-md-4">
            <label className="text-muted small">Bedrooms</label>
            <select className="form-control" value={bedrooms} onChange={e=>setBedrooms(e.target.value)}>
              <option value="">Any</option>
              {beds.map(b=> <option key={b} value={b}>{b} BHK</option>)}
            </select>
          </div>

          <div className="col-md-4 d-flex align-items-end justify-content-end">
            <button className="btn btn-primary" onClick={() => { applyFilters(); setPage(1); }}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {visible.length ? visible.map(p => <PropertyCard key={p.id} prop={p} />) : (
          <div className="col-12">
            <EmptyState />
          </div>
        )}
      </div>

      {canLoadMore && <div className="text-center mt-4"><button className="btn btn-outline-primary btn-lg" onClick={loadMore}>Load more</button></div>}
    </div>
  );
}
