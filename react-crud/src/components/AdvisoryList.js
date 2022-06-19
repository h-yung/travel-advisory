import React, { useState, useEffect } from 'react';
import AdvisoryService from '../services/AdvisoryService';
import { Link } from 'react-router-dom';

function AdvisoryList() {
  const [advisories, setAdvisories] = useState([]);
  const [currentAdvisory, setCurrentAdvisory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1); //check
  const [searchCountry, setSearchCountry] = useState("");
  useEffect(() => {
    retrieveAdvisories();
  }, []);
  function onChangeSearchCountry(e) {
    const searchCountry = e.target.value;
    setSearchCountry(searchCountry);
  };
  function retrieveAdvisories() {
    AdvisoryService.getAll()
      .then(res => {
        setAdvisories(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  function refreshList() {
    retrieveAdvisories();
    setCurrentAdvisory(null);
    setCurrentIndex(-1);
  };
  function setActiveAdvisory(advisory, index) {
    setCurrentAdvisory(advisory);
    setCurrentIndex(index);
  };
  function removeAllAdvisories() {
    AdvisoryService.removeAll()
      .then(res => {
        console.log(res.data);
        refreshList();
      })
      .catch(err => {
        console.log(err);
      });
  };
  function findByCountry() {
    AdvisoryService.findByCountry(searchCountry)
      .then(res => {
        setAdvisories(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by country"
            value={searchCountry}
            onChange={onChangeSearchCountry}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCountry}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Advisories List</h4>
        <ul className="list-group">
          {advisories &&
            advisories.map((advisory, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveAdvisory(advisory, index)}
                key={index}
              >
                {advisory.country}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllAdvisories}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentAdvisory ? (
          <div>
            <h4>Advisory</h4>
            {/* response details */}
            <div>
              <label>
                <strong>Country:</strong>
              </label>{" "}
              {currentAdvisory.country}
            </div>
            <div>
              <label>
                <strong>Negative COVID test required?</strong>
              </label>{" "}
              {currentAdvisory['negative covid test required']}
            </div>
            <div>
              <label>
                <strong>COVID test requirement details</strong>
              </label>{" "}
              {currentAdvisory['covid test detail']}
            </div>
            <div>
              <label>
                <strong>Vaccination proof required?</strong>
              </label>{" "}
              {currentAdvisory['vaccination proof required']}
            </div>
            <div>
              <label>
                <strong>Vaccination proof details</strong>
              </label>{" "}
              {currentAdvisory['vaccination proof detail']}
            </div>
            <div>
              <label>
                <strong>Source</strong>
              </label>{" "}
              {currentAdvisory.sourceName}
            </div>
            <div>
              <label>
                <strong><a href={currentAdvisory.sourceLink1}>More on COVID tests</a></strong>
              </label>{" "}
            </div>
            <div>
              <label>
                <strong><a href={currentAdvisory.sourceLink2}>More on vaccination proof</a></strong>
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Entry last updated</strong>
              </label>{" "}
              {currentAdvisory.updatedAt}
            </div>
            {/* add more here */}
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentAdvisory.published ? "Published" : "Pending"}
            </div>
            <Link
              to={"/advisories/" + currentAdvisory.id}
              className="badge badge-warning"
            >
              Edit  {/**clicking here leads to Advisory page, accessible via React Router's Link */}
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Advisory...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdvisoryList;
