import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Universities = () => {

    const DEBOUNCE_TIME = 2000;
    const [isLoading, setLoading] = useState(false);
    const [country, setCountry] = useState(null);
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        var interval = setTimeout(() => {
            getUniversities(country)
        }, DEBOUNCE_TIME);
        return () => clearTimeout(interval);
    }, [country]);

    const getUniversities = async (country) => {

        try {

            if (country === null || country === "") {
                return;
            }

            setLoading(true);
            const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`)
            if(response.data) {
                setUniversities([...response.data])
            }

        } catch (error) {
            console.log(error)
        }

        setLoading(false);
    }

    const List = ({universities}) => {
        return (
            <>
                {universities.map((university, index) => (
                    <div className='university' key={index}>
                        <p>{university.name}</p>
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className='universities-container'>
            <div className='country-field-wrapper'>
                <input className='country' name="country" id="country-field" onChange={e => setCountry(e.target.value)} />
            </div>
            <div className='universities-list'>
                {isLoading ? <small>Loading...</small> : null}
                {universities.length > 0
                    ? <List universities={universities} />
                    : !isLoading ? <small>No university found!</small> : null}
            </div>
        </div>
    )
}

export default Universities