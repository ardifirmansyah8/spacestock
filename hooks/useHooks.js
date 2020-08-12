import { useState, useEffect } from 'react';
import { places, limit } from '../constants/data';

export const usePlaces = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const onSearch = (value, type) => {
    setLoading(true);

    let cloneData = [];
    if (value === '') {
      cloneData = places.filter(place => type === place.types);
    } else {
      cloneData = places.filter(
        place =>
          type === place.types &&
          place.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
    setData(cloneData);
    setTotalPage(Math.ceil(cloneData.length / limit));
  };

  const getData = () => {
    if (data.length !== 0) {
      const pageData = data.slice((page - 1) * limit, limit * page);
      setSearchResult(pageData);
    } else {
      setSearchResult([]);
    }
    setLoading(false);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    getData();
  }, [page, data]);

  return [
    loading,
    page,
    totalPage,
    searchResult,
    nextPage,
    previousPage,
    onSearch,
  ];
};

export const useDetail = () => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);

  const getDetail = name => {
    setLoading(true);
    const findDetail = places.find(place => place.name === name);
    if (findDetail) {
      setDetail(findDetail);
    }
    setLoading(false);
  };

  return [loading, detail, getDetail];
};
