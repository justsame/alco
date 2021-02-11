import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(1);
  const [gender, setGender] = useState('male');
  const [time, setTime] = useState(1);
  const [promilles, setPromilles] = useState(0);

  const bottleAmount = [
    { label: '1 bottle', value: 1 },
    { label: '2 bottles', value: 2 },
    { label: '3 bottles', value: 3 },
    { label: '4 bottles', value: 4 },
    { label: '5 bottles', value: 5 },
    { label: '10 bottles', value: 10 },
    { label: '24 bottles', value: 24 }
  ];

  const timeAmount = [
    { label: '1 hour', value: 1 },
    { label: '2 hours', value: 2 },
    { label: '3 hours', value: 3 },
    { label: '4 hours', value: 4 },
    { label: '5 hours', value: 5 },
    { label: '10 hours', value: 10 },
    { label: '24 hours', value: 24 }
  ];

  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  function calculate() {
    let promilles = 0;
    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - burning * time;

    if (gender === 'male') {
      promilles = gramsLeft / (weight * 0.7);
    } else {
      promilles = gramsLeft / (weight * 0.6);
    }
    setPromilles(promilles);
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alcometer</Text>
      <Text style={styles.label}>Weight</Text>
      <TextInput 
      style={styles.input}
      placeholder="in kilograms"
      onChangeText={text => setWeight(text)}
      keyboardType='numeric'
      returnKeyType='done'></TextInput>
      <Text style={styles.label}>Bottles</Text>
      <DropDownPicker
        items={bottleAmount}
        defaultValue={bottles}
        containerStyle={{height: 40}}
        style={{ backgroundColor: '#fafafa' }}
        zIndex={10} //en huomannut ongelmia androidilla vaikka on zIndex (testattu iOS ja Android)
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => setBottles(item.value)}
      />
      <Text style={styles.label}>Time</Text>
      <DropDownPicker
        items={timeAmount}
        defaultValue={time}
        zIndex={9}
        containerStyle={{height: 40}}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => setTime(item.value)}
      />
      <Text style={styles.label}>Gender</Text>
      <RadioForm 
        style={styles.radio}
        buttonSize = {10}
        radio_props={genders}
        initial={0}
        onPress={(value)=>{setGender(value)}}
      />
      <Text style={styles.label}>Promilles</Text>
      <Text style={styles.result}>{promilles.toFixed(2)}</Text>
      <Button onPress={calculate} title="Calculate"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    marginBottom: 10,
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 30,
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 5,
  },
  result: {
    marginBottom: 30,
    fontSize: 20,
  },
  radio: {
    marginTop: 10,
  },
});
