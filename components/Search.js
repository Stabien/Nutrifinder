import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, useDispatch, useSelector } from 'react-redux';

export default Search = () => {
  const [cancelButtonStyle, setCancelButtonStyle] = useState(styles.cancelButtonHidden);
  const [currentResearch, setCurrentResearch] = useState('');
  const dispatch = useDispatch();
  const searchBar = useRef(null);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Display animation cancel button on search bar focus
  const displayCancel = () => {
    Animated.timing(widthAnim, {
      toValue: 70,
      duration: 250,
      useNativeDriver: false
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false
    }).start();
  };

  // Hide animation cancel button on search bar focus
  const hideCancel = () => {
    Animated.timing(widthAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  };

  // Update currentResearch redux state
  const updateCurrentResearch = () => {
    return {
      type: 'UPDATE_CURRENT_RESEARCH',
      currentResearch: currentResearch
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="ios-search" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder='Rechercher un produit'
          returnKeyType='search'
          clearButtonMode='while-editing'
          ref={searchBar}
          autoCorrect={false}
          onChangeText={text => setCurrentResearch(text)}
          onFocus={() => {
            setCancelButtonStyle(styles.cancelButtonDisplayed);
            displayCancel();
          }}
          onSubmitEditing={() => {
            setCancelButtonStyle(styles.cancelButtonHidden);
            hideCancel();
            dispatch(updateCurrentResearch());
          }}
        />
      </View>
      <Animated.View
        style={{
          justifyContent: 'center',
          width: widthAnim,
          opacity: opacityAnim,
          height: 37
        }}
      >
        <TouchableOpacity style={cancelButtonStyle}
          onPress={() => {
            setCancelButtonStyle(styles.cancelButtonHidden);
            hideCancel();
            Keyboard.dismiss();
            searchBar.current.clear();
          }}
        >
          <Text style={{ fontSize: 18, color: "#007BFF" }}>Annuler</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC'
  },
  searchBar: {
    marginHorizontal: 15,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    flex: 1,
    height: 37
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1
  },
  cancelButtonHidden: {
    paddingHorizontal: 10,
    marginRight: 0,
    marginLeft: -15,
    justifyContent: 'center',
    width: 0
  },
  cancelButtonDisplayed: {
    paddingHorizontal: 10,
    marginRight: 0,
    marginLeft: -15,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 21,
    justifyContent: 'center',
    color: '#A5A5A5'
  }
});
