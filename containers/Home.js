import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from '../components/Search.js';
import List from '../components/List.js';

export default Home = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => navigation.navigate('Filters')}
        >
          <Icon title='Filtrer' name='options' size={24} color='#FFF'/>
        </TouchableOpacity>
      )
    });
  });

  return (
    <View style={styles.container}>
      <Search/>
      <List navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    marginTop: 0,
    backgroundColor: '#F7F8FA',
    flex: 1
  },
  filterIcon: {
    marginRight: 15,
    padding: 3,
    paddingRight: 2,
    paddingBottom: 1,
    paddingTop: 1,
    borderRadius: 5,
    backgroundColor: '#007BFF'
  }
});
