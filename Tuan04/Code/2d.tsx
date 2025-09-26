import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';

export default function App() {
  const [length, setLength] = useState('8');
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}<>?,./';

    let chars = '';
    if (includeLower) chars += lower;
    if (includeUpper) chars += upper;
    if (includeNumber) chars += numbers;
    if (includeSymbol) chars += symbols;

    if (chars.length === 0) {
      setPassword('Please select at least one option');
      return;
    }

    let generated = '';
    for (let i = 0; i < parseInt(length || '0'); i++) {
      const index = Math.floor(Math.random() * chars.length);
      generated += chars[index];
    }

    setPassword(generated);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>PASSWORD GENERATOR</Text>

        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{password}</Text>
        </View>

        {/* Length */}
        <View style={styles.row}>
          <Text style={styles.label}>Password length</Text>
          <TextInput
            style={styles.input}
            value={length}
            onChangeText={setLength}
            keyboardType="numeric"
          />
        </View>

        {/* Lowercase */}
        <View style={styles.row}>
          <Text style={styles.label}>Include lower case letters</Text>
          <Switch value={includeLower} onValueChange={setIncludeLower} />
        </View>

        {/* Uppercase */}
        <View style={styles.row}>
          <Text style={styles.label}>Include uppercase letters</Text>
          <Switch value={includeUpper} onValueChange={setIncludeUpper} />
        </View>

        {/* Numbers */}
        <View style={styles.row}>
          <Text style={styles.label}>Include number</Text>
          <Switch value={includeNumber} onValueChange={setIncludeNumber} />
        </View>

        {/* Symbols */}
        <View style={styles.row}>
          <Text style={styles.label}>Include special symbol</Text>
          <Switch value={includeSymbol} onValueChange={setIncludeSymbol} />
        </View>

        <TouchableOpacity style={styles.button} onPress={generatePassword}>
          <Text style={styles.buttonText}>GENERATE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b73ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#1d1b4f',
    padding: 24,
    borderRadius: 16,
    width: '100%',
    maxWidth: 350,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: '#0f0f2d',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 6,
    width: 60,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a49a5',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
