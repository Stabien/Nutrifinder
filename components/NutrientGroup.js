import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { useFonts } from 'expo-font';

export default NutrientGroup = (props) => {
  const nutrientList = Object.keys(props.data).map((keyName, index) => {
    let currentStyle = Object.keys(props.data).length - 1 === index ? styles.lastRow : styles.row;
    return (
      <View style={currentStyle} key={index}>
        <Text style={{ fontSize: 18 }}>{keyName}</Text>
        <Text style={styles.value}>{props.data[keyName]}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.quantityInfo}>pour 100g</Text>
      </View>
      <View>{nutrientList}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityInfo: {
    fontSize: 16,
    color: 'white',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: "#FF8402",
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  row: {
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  lastRow: {
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 19,
    marginTop: 0,
    fontWeight: 'bold',
    color: 'white'
  },
  value: {
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 18
  }
});
