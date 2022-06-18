import React, { useState } from 'react';
import AdvisoryService from '../services/AdvisoryService';

function AddAdvisory() {
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
    const [advisory, setAdvisory] = useState(initialAdvisoryState);
    const [submitted, setSubmitted] = useState(false);
    function handleInputChange(event){
        const { name, value } = event.target;
        setAdvisory({...advisory, [name]: value });
    };
    function saveAdvisory(){
        const data = {
            country: advisory.country,
            covTest: advisory.covTest,
            testDetail: advisory.testDetail,
            testType: advisory.testType,
            vaxProof: advisory.vaxProof,
            vaxDetail: advisory.vaxDetail,
            vaxType: advisory.vaxType, //spreadsynt? convert to array?
            sName: advisory.sName,
            covTestLink: advisory.covTestLink,
            vaxProofLink: advisory.vaxProofLink,
            published: advisory.published
        };
        AdvisoryService.create(data)
            .then(res => {
                setAdvisory({
                    id: res.data.id,
                    country: res.data.country,
                    "negative covid test required": res.data.covTest,
                    "covid test detail": res.data.testDetail,
                    "accepted tests": res.data.testType,
                    "vaccination proof required": res.data.vaxProof,
                    "vaccination proof detail": res.data.vaxDetail,
                    "accepted proof": [res.data.vaxType], //array here, edit would push or repl?
                    sourceName: res.data.sName,
                    sourceLink1: res.data.covTestLink,
                    sourceLink2: res.data.vaxProofLink,
                    published: res.data.published
                });
                setSubmitted(true);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    function newAdvisory(){
        setAdvisory(initialAdvisoryState);
        setSubmitted(false);
    };
    return (
        // check submitted state - if true, show Add button to allow create next new
        // else show Submit button
        <div className='submit-form'>
            {submitted ? (
                <div>
                    <h4>You submitted a new advisory.</h4>
                    <button 
                        className='btn btn-success'
                        onClick={newAdvisory}
                    >
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    {/* inputs to componentize */}
                    <div className='form-group'>
                        <label htmlFor='country'>Country</label>
                        <input
                            type='text'
                            className='form-control'
                            id='country'
                            required
                            value={advisory.country}
                            onChange={handleInputChange}
                            name='country'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='covTest'>Negative COVID test required?</label>
                        <input
                            type='text'
                            className='form-control'
                            id='covTest'
                            required
                            value={advisory.covTest}
                            onChange={handleInputChange}
                            name='covTest'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='testDetail'>COVID test requirement details</label>
                        <input
                            type='text'
                            className='form-control'
                            id='testDetail'
                            required
                            value={advisory.testDetail}
                            onChange={handleInputChange}
                            name='testDetail'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='testType'>Accepted tests</label>
                        <input
                            type='text'
                            className='form-control'
                            id='testType'
                            required
                            value={advisory.testType}
                            onChange={handleInputChange}
                            name='testType'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='vaxProof'>Vaccination proof required?</label>
                        <input
                            type='text'
                            className='form-control'
                            id='vaxProof'
                            required
                            value={advisory.vaxProof}
                            onChange={handleInputChange} 
                            name='vaxProof'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='vaxDetail'>Vaccination proof requirement details</label>
                        <input
                            type='text'
                            className='form-control'
                            id='vaxDetail'
                            required
                            value={advisory.vaxDetail}
                            onChange={handleInputChange}
                            name='vaxDetail'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='vaxType'>Accepted proof</label>
                        <input
                            type='text'
                            className='form-control'
                            id='vaxType'
                            required
                            value={advisory.vaxType}
                            onChange={handleInputChange} //specify handling for editing->array.push or concat?
                            name='vaxType'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='sName'>Source</label>
                        <input
                            type='text'
                            className='form-control'
                            id='sName'
                            required
                            value={advisory.sName}
                            onChange={handleInputChange}
                            name='sName'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='covTestLink'>Link to COVID test requirements</label>
                        <input
                            type='text'
                            className='form-control'
                            id='covTestLink'
                            required
                            value={advisory.covTestLink}
                            onChange={handleInputChange}
                            name='covTestLink'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='vaxProofLink'>Link to vaccination proof requirements</label>
                        <input
                            type='text'
                            className='form-control'
                            id='vaxProofLink'
                            required
                            value={advisory.vaxProofLink}
                            onChange={handleInputChange}
                            name='vaxProofLink'
                        />
                    </div>
                    <button 
                        className='btn btn-success'
                        onClick={saveAdvisory} 
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddAdvisory;


