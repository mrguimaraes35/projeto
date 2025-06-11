import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function DetailsScreen({ route }) {
  const { livro } = route.params;

  return (
    <Card style={{ margin: 20, padding: 16 }}>
      <Card.Title title={livro.titulo} subtitle={`Autor: ${livro.autor}`} />
      <Card.Content>
        <Text>Gênero: {livro.genero}</Text>
        <Text>Ano: {livro.ano}</Text>
        <Text>Avaliação: {livro.avaliacao} estrelas</Text>
      </Card.Content>
    </Card>
  );
}
