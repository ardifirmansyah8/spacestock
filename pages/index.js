import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { types } from '../constants/data';
import Button from '../components/Button';
import Card from '../components/Card';
import DataNotFound from '../components/DataNotFound';
import Loader from '../components/Loader';
import Input from '../components/Form/Input';
import Select from '../components/Form/Select';
import { usePlaces } from '../hooks/useHooks';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const Page = () => {
  const router = useRouter();

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
    setSearch(value);
    onSearch(value, type);
  }, 300);

  const handleType = value => {
    setType(value);
    onSearch(search, value);
  };

  const goToDetail = place => {
    router.push(`/detail/${place}`);
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
          {loading && <Loader />}

          {!loading && places.length === 0 ? (
            <DataNotFound />
          ) : (
            <>
              <div
                className="grid grid-cols-2 gap-6 mb-6"
                style={{ minHeight: 715 }}
              >
                {places.map((data, i) => (
                  <Card key={i} data={data} onClick={goToDetail} />
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
          <Map data={places} markerClick={goToDetail} />
        </div>
      </div>
    </div>
  );
};

export default Page;
