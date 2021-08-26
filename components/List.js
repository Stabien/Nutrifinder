import React, { useState, useEffect } from 'react';
import ItemDetail from '../containers/ItemDetail.js';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import getIcon from '../data/getIcon.js';
import { connect, useSelector } from 'react-redux';
import { getItemsFromResearch } from '../data/controllers.js';

const List = ({ navigation }) => {
  const currentResearch = useSelector(state => state.currentResearch);
  const productFilters = useSelector(state => state.productFilters);
  const [listItem, setListItem] = useState('');

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        style={styles.item}
        onPress={() => navigation.navigate('ItemDetail', {
          id: item.id,
          name: item.name,
          typeName: item.typeName,
          typeId: item.typeId
        })}
        underlayColor="#CFCFCF"
      >
        <View style={styles.itemContent}>
          <Image style={styles.icon} source={getIcon(item.typeId)}/>
          <View style={{ width: 250 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={styles.typeName}>{item.typeName}</Text>
          </View>
          <Icon name="chevron-forward-outline" size={20} style={styles.arrow}/>
        </View>
      </TouchableHighlight>
    );
  }

  // Applies filters to listItem and return only first 50 elements
  const filter = (listItem) => {
    let currentList = [];
    if (productFilters.length > 0) {
      for (let productType of productFilters)
        for (let i = 0; i < listItem.length; i++)
          if (listItem[i].categoryName === productType && currentList.length < 50)
            currentList.push(listItem[i]);
    }
    else {
      for (i = 0; i < listItem.length; i++)
        if (i < 50) currentList.push(listItem[i]);
    }
    setListItem(currentList);
  }

  useEffect(() => {
    if (currentResearch.length > 0) {
      getItemsFromResearch(currentResearch)
        .then(response => filter(response))
        .catch(error => console.log(error));
    }
  }, [currentResearch, productFilters]);

  if (currentResearch.length == 0 && listItem.length == 0)
    return (
      <View style={styles.defaultBackgroundContainer}>
        <Text style={styles.defaultBackgroundTitle}>Bienvenue sur Nutrifinder !</Text>
        <Text style={styles.defaultBackgroundUnderTitle}>Recherchez plus de 3000 produits dès maintenant !</Text>
      </View>
    );
  else
    if (currentResearch.length > 0 && listItem.length == 0)
      return (
        <View style={styles.defaultBackgroundContainer}>
          <Text style={styles.noResultText}>Aucun résultat trouvé pour cette recherche</Text>
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <FlatList
            data={listItem}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 0,
    height: '100%',
    flex: 1
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#CFCFCF',
    paddingBottom: 12,
    paddingLeft: 20
  },
  arrow: {
    color: '#7F7F7F',
    marginLeft: 'auto',
    marginRight: 20,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  defaultBackgroundContainer: {
    display: 'flex',
    padding: 25,
    flex: 1,
    paddingTop: 0,
    justifyContent: 'center',
    marginBottom: 50
  },
  defaultBackgroundTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#AFAFAF',
    marginBottom: 6
  },
  defaultBackgroundUnderTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#AFAFAF'
  },
  noResultText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#AFAFAF',
  },
  icon: {
    width: 40,
    height: 40,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 20
  },
  item: {
    paddingTop: 12,
    paddingBottom: 0,
    paddingRight: 0
  },
  typeName: {
    fontSize: 14,
    marginTop: 5,
    color: "#9F9F9F"
  }
});

export default connect((state) => {
  return {
    currentResearch: state.currentResearch,
    productFilters: state.productFilters
  };
})(List);
