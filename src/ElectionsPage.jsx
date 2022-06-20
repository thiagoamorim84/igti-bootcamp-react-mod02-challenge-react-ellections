import { useEffect, useState } from 'react';

import {
  apiGetAllCities,
  apiGetAllCandidates,
  apiGetElectionByCity,
} from './services/apiService';

import Select from './components/Select';
import { Election } from './components/Election';

export default function ElectionsPage() {
  const [allCities, setAllCities] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [election, setElection] = useState(null);

  function handleChangeCity(newCityId) {
    setSelectedCityId(newCityId);
  }

  useEffect(() => {
    async function getAllCitiesAndCandidates() {
      try {
        const cities = await apiGetAllCities();
        setAllCities(cities);

        const candidates = await apiGetAllCandidates();
        setAllCandidates(candidates);

        setSelectedCityId(cities[0].id);
      } catch (err) {
        throw Error(err.message);
      }
    }

    getAllCitiesAndCandidates();
  }, []);

  useEffect(() => {
    async function getElectionByCity() {
      try {
        if (selectedCityId) {
          const electionByCityData = await apiGetElectionByCity(selectedCityId);

          const electionData = electionByCityData.map(e => {
            return {
              ...e,
              city: allCities.find(c => c.id === e.cityId),
              candidate: allCandidates.find(c => c.id === e.candidateId),
            };
          });
          setElection(electionData);
        }
      } catch (err) {
        throw Error(err.message);
      }
    }

    getElectionByCity();
  }, [selectedCityId, allCities, allCandidates]);

  return (
    <div>
      <header>
        <div className="bg-gray-100 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">react-elections</h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4 flex items-center justify-center">
          <Select
            labelDescription="Escolha o município"
            defaultSelectValue={selectedCityId}
            onSelectChange={handleChangeCity}
          >
            {allCities}
          </Select>
        </div>

        <Election>{election}</Election>
      </main>
    </div>
  );
}
