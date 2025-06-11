import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen() {
  const [media, setMedia] = useState(0);

  useEffect(() => {
    const calcularMedia = async () => {
      const livros = JSON.parse(await AsyncStorage.getItem('livros')) || [];
      const total = livros.reduce((acc, l) => acc + parseFloat(l.avaliacao || 0), 0);
      setMedia((total / (livros.length || 1)).toFixed(1));
    };
    calcularMedia();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Card>
        <Card.Title title="Média de Avaliação" />
        <Card.Content>
          <Text style={{ fontSize: 24 }}>{media} ⭐</Text>
        </Card.Content>
      </Card>
    </View>
  );
}
