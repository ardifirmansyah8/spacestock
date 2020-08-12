import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';

import DataNotFound from '../../components/DataNotFound';
import Loader from '../../components/Loader';
import { useDetail } from '../../hooks/useHooks';

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

const Page = () => {
  const { query } = useRouter();

  const [loading, detail, getDetail] = useDetail();

  useEffect(() => {
    getDetail(query.place);
  }, [query.place]);

  return (
    <div className="h-screen px-32">
      {loading && <Loader />}
      {!loading && !detail ? (
        <DataNotFound />
      ) : (
        <div>
          <a className="flex my-5 cursor-pointer" href="/">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="text-base">Back to list</div>
          </a>

          <div className="mb-10 flex flex-col rounded shadow-lg border border-gray-400">
            <div className="font-bold text-xl mx-5 mt-5 mb-2">
              {detail.name}
            </div>
            <div className="inline-flex self-start bg-blue-400 rounded-full px-3 py-1 text-sm font-medium text-white mx-5 mb-5">
              {detail.types}
            </div>
            <img
              className="w-full"
              src={detail.images.primary}
              alt="image asset"
              style={{ height: 400 }}
            />
            <div className="p-5 flex">
              <div className="flex-1 mb-5">
                <div className="font-bold text-base mb-2">Description</div>
                <div className="text-base mb-5">{detail.description}</div>

                <div className="font-bold text-base mb-2">Facilities</div>
                {detail.facilities.map(facility => (
                  <div
                    key={facility}
                    className="inline-flex self-start bg-gray-400 rounded-full px-3 py-1 text-sm font-medium mr-2"
                  >
                    {facility}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="font-bold text-base mb-2">Location</div>
                <div className="text-base mb-5">{`${detail.address.street}, ${detail.address.city}, ${detail.address.province}, ${detail.address.country}`}</div>
                <div style={{ height: 200 }}>
                  <Map data={detail} />
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="font-bold text-base mb-2">Images</div>
              <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={{
                  desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items:
                      detail.images.others.length >= 3
                        ? 3
                        : detail.images.others.length,
                  },
                }}
                infinite={true}
                autoPlay={false}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                itemClass="mr-3"
              >
                {detail.images.others.map((img, i) => (
                  <img key={i} src={img} width={400} className="h-48" />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
