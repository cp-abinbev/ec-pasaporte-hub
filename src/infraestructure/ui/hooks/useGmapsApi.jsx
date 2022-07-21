import { Loader } from '@googlemaps/js-api-loader';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useGoogleMapsApi = ({ library = '', gmapsApiKey = '', onLoad = () => {} }) => {
  const [loaded, setLoaded] = useState(false);
  const { options } = useSelector((store) => store.googleMapsOptionsReducer);
	const { googleApiKey } = options;
  const libraries = [];

  if (library) {
    libraries.push(library);
  }

	const handleSuccess = _.debounce(google => {
		setLoaded(true);

		if (typeof onLoad === 'function') {
			onLoad();
		}
	}, 200);

  useEffect(() => {
    if (gmapsApiKey.length || googleApiKey) {
      const loader = new Loader({
        apiKey: gmapsApiKey || googleApiKey,
        version: 'weekly',
        libraries,
      });

      loader
        .load()
        .then(handleSuccess)
        .catch((e) => {
          console.error('Error: ', e);
        });
    }
  }, [googleApiKey, gmapsApiKey]);

  return [loaded];
};
