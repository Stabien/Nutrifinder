import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, Image } from 'react-native';
import { useFonts } from 'expo-font';
import NutrientGroup from '../components/NutrientGroup.js';
import getIcon from '../data/getIcon.js';
import { getItemDetail } from '../data/controllers.js';

export default ItemDetail = ({ route }) => {
  const [itemContent, setItemContent] = useState('');
  const g = [
    'lipides',
    'glucides',
    'proteines',
    'fibres',
    'sucre',
    'ags'
  ];
  const mg = [
    'sel',
    'calcium',
    'chlorure',
    'cuivre',
    'fer',
    'magnesium',
    'manganese',
    'phosphore',
    'potassium',
    'selenium',
    'sodium',
    'zinc',
    'vitamineC',
    'vitamineE',
    'vitamineB1',
    'vitamineB2',
    'vitamineB3',
    'vitamineB5',
    'vitamineB6'
  ];
  const µg = [
    'iode',
    'vitamineA',
    'vitamineD',
    'vitamineK1',
    'vitamineK2',
    'vitamineB9',
    'vitamineB12'
  ];
  const ml = [
    'alcool',
    'eau'
  ];
  const energy = {
    'KJ': itemContent.kj,
    'Kcal': itemContent.kcal
  };
  const calories = {
    'Lipides': itemContent.lipides,
    'Glucides': itemContent.glucides,
    'Protéines': itemContent.proteines,
    'Fibres': itemContent.fibres,
    'Sucre': itemContent.sucre,
    'Acides gras saturés': itemContent.ags
  };
  const vitamines = {
    'Vitamine A': itemContent.vitamineA,
    'Vitamine C': itemContent.vitamineC,
    'Vitamine D': itemContent.vitamineD,
    'Vitamine E': itemContent.vitamineE,
    'Vitamine B1': itemContent.vitamineB1,
    'Vitamine B2': itemContent.vitamineB2,
    'Vitamine B3': itemContent.vitamineB3,
    'Vitamine B5': itemContent.vitamineB5,
    'Vitamine B6': itemContent.vitamineB6,
    'Vitamine B9': itemContent.vitamineB9,
    'Vitamine B12': itemContent.vitamineB12,
    'Vitamine K1': itemContent.vitamineK1,
    'Vitamine K2': itemContent.vitamineK2
  };
  const saltAndMinerals = {
    'Sel': itemContent.sel,
    'Eau': itemContent.eau,
    'Alcool': itemContent.alcool,
    'Calcium': itemContent.calcium,
    'Chlorure': itemContent.chlorure,
    'Cuivre': itemContent.cuivre,
    'Fer': itemContent.fer,
    'Iode': itemContent.iode,
    'Magnesium': itemContent.magnesium,
    'Manganese': itemContent.manganese,
    'Phosphore': itemContent.phosphore,
    'Potassium': itemContent.potassium,
    'Sélénium': itemContent.selenium,
    'Sodium': itemContent.sodium,
    'Zinc': itemContent.zinc
  };

  const setUnitOfMeasure = (item) => {
    Object.keys(item).map((keyName, index) => {
      if (item[keyName] == 'null')
        item[keyName] = '-';
      if (g.includes(keyName) && item[keyName] != '-' && item[keyName] != 'traces')
        item[keyName] += 'g';
      if (mg.includes(keyName) && item[keyName] != '-' && item[keyName] != 'traces')
        item[keyName] += 'mg';
      if (µg.includes(keyName) && item[keyName] != '-' && item[keyName] != 'traces')
        item[keyName] += 'µg';
      if (ml.includes(keyName) && item[keyName] != '-' && item[keyName] != 'traces')
        item[keyName] += 'ml';
    });
    return item;
  }

  useEffect(() => {
    getItemDetail(route.params.id)
      .then(response => {
        response = setUnitOfMeasure(response);
        setItemContent(response);
      });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#F7F8FA' }}>
      <View style={{ padding: 20, paddingBottom: 15 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={getIcon(route.params.typeId)} style={styles.icon}/>
          <View style={{ marginLeft: 10, marginRight: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{route.params.name}</Text>
            <Text style={{ fontSize: 20, color: '#AFAFAF' }}>{route.params.typeName}</Text>
          </View>
        </View>
        <NutrientGroup title="Energie" data={energy}/>
        <NutrientGroup title="Calories" data={calories}/>
        <NutrientGroup title="Sels et mineraux" data={saltAndMinerals}/>
        <NutrientGroup title="Vitamines" data={vitamines}/>
        <Text style={styles.sources}>Sources : ciqual.anses.fr</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 45,
    height: 45,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  sources: {
    color: '#8F8F8F',
    fontSize: 16,
    marginTop: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: '500'
  }
});
