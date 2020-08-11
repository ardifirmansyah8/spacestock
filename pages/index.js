import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import debounce from 'lodash/debounce';

import { types } from '../constants/data';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Input from '../components/Form/Input';
import Select from '../components/Form/Select';
import { usePlaces } from '../hooks/useHooks';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const Page = () => {
  const [
    loading,
    page,
    totalPage,
    places,
    nextPage,
    previousPage,
    onSearch,
  ] = usePlaces();

  const [search, setSearch] = useState('');
  const [type, setType] = useState(types[0]);

  useEffect(() => {
    onSearch('', types[0]);
  }, []);

  const handleSearch = debounce((value, type) => {
    setSearch(search);
    onSearch(value, type);
  }, 300);

  const handleType = value => {
    setType(value);
    onSearch(search, value);
  };

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center border-b border-gray-300 shadow p-2">
        <Input
          className="mr-4"
          withIcons
          onChange={value => handleSearch(value, type)}
        />
        <Select options={types} onChange={value => handleType(value)} />
      </div>

      <div className="flex">
        <div className="flex-1 bg-gray-100 px-6 py-4">
          {loading && (
            <div className="h-full flex items-center justify-center">
              <Loader />
            </div>
          )}

          {!loading && places.length === 0 && (
            <div className="h-full flex items-center justify-center">
              Data not found
            </div>
          )}

          {!loading && places.length !== 0 && (
            <>
              <div
                className="grid grid-cols-2 gap-6 mb-6"
                style={{ minHeight: 715 }}
              >
                {places.map((data, i) => (
                  <Card key={i} data={data} />
                ))}
              </div>

              <div className="w-full inline-flex justify-center">
                <Button
                  className="mr-4"
                  label="Previous"
                  disabled={totalPage === 1 || page === 1}
                  onClick={previousPage}
                />
                <Button
                  label="Next"
                  variant="primary"
                  disabled={totalPage === 1 || page === totalPage}
                  onClick={nextPage}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex-1" style={{ minHeight: 813 }}>
          <Map data={places} />
        </div>
      </div>
    </div>
  );
};

export default Page;
