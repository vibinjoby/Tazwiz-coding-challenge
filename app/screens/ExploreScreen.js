import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
} from 'react-native';
import exploreService from '../services/ExploreService';
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppExplorerComp from '../components/AppExplorerComp';
import AppLoader from '../helpers/AppLoader';

export default function ExploreScreen({route, navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);

  const fetchDataOnLoad = async () => {
    try {
      !isLoading && setIsLoading(true);
      const {data} = await exploreService.getExploreData();

      setApiData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Unable to Fetch data from api', error, [
        {
          text: 'OK',
          onPress: () => setIsLoading(false),
          style: 'cancel',
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleAddPostNavigation = () => {
    navigation.navigate(routes.POST_TASK);
  };

  useEffect(() => {
    Keyboard.dismiss();
    fetchDataOnLoad();
  }, []);

  return (
    <>
      <AppLoader isLoading={isLoading} />
      <View style={styles.container}>
        <FlatList
          data={apiData}
          renderItem={({item}) => (
            <AppExplorerComp
              name={item.firstName}
              email={item.email}
              uri={item.picture}
            />
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity
          style={styles.addPost}
          onPress={handleAddPostNavigation}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    margin: 10,
  },
  addPost: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: colors.lightPrimary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  plus: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 40,
  },
});
