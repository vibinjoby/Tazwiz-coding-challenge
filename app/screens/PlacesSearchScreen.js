import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import routes from '../navigation/routes';

export default function PlacesSearchScreen({route, navigation}) {
  const handleSearchSelection = address => {
    navigation.navigate(routes.POST_TASK, {address});
  };

  return (
    <GooglePlacesAutocomplete
      autoFocus
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        handleSearchSelection(details.description);
      }}
      query={{
        key: process.env.PLACES_API_KEY,
        language: 'en',
      }}
    />
  );
}
