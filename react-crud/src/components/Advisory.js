import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import AdvisoryService from '../services/AdvisoryService';

function Advisory(props){
  const { id }= useParams();
  let navigate = useNavigate();
  const initialAdvisoryState = {
    id: null,
    country: "",
    "negative covid test required":"",
    "covid test detail": "",
    "accepted tests": "",
    "vaccination proof required": "",
    "vaccination proof detail": "",
    "accepted proof": [],
    sourceName: "",
    sourceLink1: "",
    sourceLink2: "",
    published: false
  };
  const [currentAdvisory, setCurrentAdvisory] = useState(initialAdvisoryState);
  const [message, setMessage] = useState("");
  const getAdvisory = id => {
    AdvisoryService.get(id)
      .then(res => {
        setCurrentAdvisory(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (id)
      getAdvisory(id);
  }, [id]);
  function handleInputChange(event){
    const { name, value } = event.target;
    setCurrentAdvisory({ ...currentAdvisory, [name]: value });
  };
  function updatePublished(status){
    const data = {
        id: currentAdvisory.id,
        country: currentAdvisory.country,
        covTest: currentAdvisory.covTest,
        testDetail: currentAdvisory.testDetail,
        testType: currentAdvisory.testType,
        vaxProof: currentAdvisory.vaxProof,
        vaxDetail: currentAdvisory.vaxDetail,
        vaxType: currentAdvisory.vaxType, //spreadsynt? convert to array?
        sName: currentAdvisory.sName,
        covTestLink: currentAdvisory.covTestLink,
        vaxProofLink: currentAdvisory.vaxProofLink,
        published: status 
    };
    AdvisoryService.update(currentAdvisory.id, data)
      .then(res => {
        setCurrentAdvisory({ ...currentAdvisory, published: status });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  function updateAdvisory(){
    AdvisoryService.update(currentAdvisory.id, currentAdvisory)
      .then(res => {
        console.log(res.data);
        setMessage("The advisory has been updated.");
      })
      .catch(err => {
        console.log(err);
      });
  };
  function deleteAdvisory(){
    AdvisoryService.removeOne(currentAdvisory.id)
      .then(res => {
        console.log(res.data);
        navigate("/advisories");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      {currentAdvisory ? (
        <div className="edit-form">
          <h4>Advisory</h4>
          <form>
            {/* response details */}
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={currentAdvisory.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="covTest">Negative COVID test required?</label>
              <input
                type="text"
                className="form-control"
                id="covTest"
                name="covTest"
                value={currentAdvisory['negative covid test required']}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="testDetail">COVID test requirement details</label>
              <input
                type="text"
                className="form-control"
                id="testDetail"
                name="testDetail"
                value={currentAdvisory['covid test detail']}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vaxProof">Vaccination proof required?</label>
              <input
                type="text"
                className="form-control"
                id="vaxProof"
                name="vaxProof"
                value={currentAdvisory['vaccination proof required']}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vaxDetail">Vaccination proof details</label>
              <input
                type="text"
                className="form-control"
                id="vaxDetail"
                name="vaxDetail"
                value={currentAdvisory['vaccination proof detail']}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sName">Source</label>
              <input
                type="text"
                className="form-control"
                id="sName"
                name="sName"
                value={currentAdvisory.sourceName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sName">Source</label>
              <input
                type="text"
                className="form-control"
                id="sName"
                name="sName"
                value={currentAdvisory.sourceName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="covTestLink">More on COVID tests</label>
              <input
                type="text"
                className="form-control"
                id="covTestLink"
                name="covTestLink"
                value={currentAdvisory.sourceLink1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vaxProofLink">More on vaccination proof</label>
              <input
                type="text"
                className="form-control"
                id="vaxProofLink"
                name="vaxProofLink"
                value={currentAdvisory.sourceLink2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastUpdated">Entry last updated</label>
              <input
                type="text"
                className="form-control"
                id="lastUpdated"
                name="lastUpdated"
                value={currentAdvisory.updatedAt}
                onChange={handleInputChange}
              />
            </div>
            {/* add more here */}
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentAdvisory.published ? "Published" : "Pending"}
            </div>
          </form>
          {currentAdvisory.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          <button className="badge badge-danger mr-2" onClick={deleteAdvisory}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateAdvisory}
          >
            Update
          </button>
          <p>{message}</p> {/**note on status after submitted update or deleted */}
        </div>
      ) : (
        <div>
          <br /> {/*restyle in CSS */}
          <p>Please click on an Advisory...</p>
        </div>
      )}
    </div>
  );
};
export default Advisory;
