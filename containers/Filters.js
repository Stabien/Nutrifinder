import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, CheckBox, ScrollView, TouchableHighlight, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, useSelector, useDispatch } from 'react-redux';

const Filters = ({ navigation }) => {
  const [productFilters, setProductFilters] = useState(useSelector(state => state.productFilters));
  const dispatch = useDispatch();
  const categories = [
    'Aides culinaires et ingrédients divers',
    'Aliments infantiles',
    'Entrées et plats composés',
    'Eaux et autres boissons',
    'Fruits, légumes, légumineuses et oléagineux',
    'Glaces et sorbets',
    'Matières grasses',
    'Produits céréaliers',
    'Produits laitiers et assimilés',
    'Produits sucrés',
    'Viandes, œufs, Poissons et assimilés'
  ];

  const updateProductFilters = (product, isChecked) => {
    if (isChecked)
      setProductFilters([...productFilters, product])
    else
      setProductFilters(productFilters.filter(item => item !== product));
  }

  const categoryList = categories.map((item, index) => {
    let isChecked = productFilters.includes(item);
    return (
      <TouchableHighlight
        onPress={() => {
          isChecked = !isChecked;
          updateProductFilters(item, isChecked);
        }}
        underlayColor='#CFCFCF'
        key={index}
      >
        <View style={styles.item}>
          <Icon
            name={isChecked ? 'checkbox' : 'square-outline'}
            color={isChecked ? '#007BFF' : 'black'}
            size={20}
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
          <Text style={[styles.textItem, { color: isChecked ? '#007BFF' : 'black' }]}>{item}</Text>
        </View>
      </TouchableHighlight>
    );
  });

  const updateFilters = () => {
    return {
      type: 'UPDATE_PRODUCT_FILTERS',
      productFilters: productFilters
    };
  }

  const submit = () => {
    dispatch(updateFilters());
    navigation.goBack();
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => setProductFilters([])}
        >
          <Text style={{ fontSize: 16, color: '#007AFF' }}>Réinitialiser</Text>
        </TouchableOpacity>
      )
    });
  }, [productFilters]);

  return (
    <View style={{ paddingBottom: 50 }}>
      <ScrollView style={{ backgroundColor: '#EFEFEF' }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Type de produits</Text>
          </View>
          <View>{categoryList}</View>
        </View>
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <TouchableHighlight
          style={styles.submitButton}
          onPress={() => submit()}
          underlayColor='#4DA3FF'
        >
          <Text style={styles.textSubmitButton}>Appliquer</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white'
  },
  titleContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#EFEFEF'
  },
  title: {
    fontSize: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 20,
    fontWeight: '600',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 22,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E7E7E7'
  },
  textItem: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 25,
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: '400'
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  textSubmitButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default connect((state) => {
  return { productFilters: state.productFilters };
})(Filters);
