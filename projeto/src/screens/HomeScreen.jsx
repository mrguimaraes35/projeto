
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [livros, setLivros] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) carregarLivros();
  }, [isFocused]);

  const carregarLivros = async () => {
    const json = await AsyncStorage.getItem('livros');
    setLivros(json ? JSON.parse(json) : []);
  };

  const excluirLivro = async (id) => {
    const novos = livros.filter((livro) => livro.id !== id);
    await AsyncStorage.setItem('livros', JSON.stringify(novos));
    setLivros(novos);
  };

  return (
    <FlatList
      data={livros}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Title title={item.titulo} subtitle={`Autor: ${item.autor}`} />
          <Card.Content>
            <Text>Gênero: {item.genero}</Text>
            <Text>Ano: {item.ano}</Text>
            <Text>Avaliação: {item.avaliacao}⭐</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Details', { livro: item })}>
              Detalhes
            </Button>
            <IconButton icon="pencil" onPress={() => navigation.navigate('Adicionar', { livro: item })} />
            <IconButton icon="delete" onPress={() => excluirLivro(item.id)} />
          </Card.Actions>
        </Card>
      )}
    />
  );
}
