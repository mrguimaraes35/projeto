import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormScreen({ route, navigation }) {
  const [form, setForm] = useState({
    id: '',
    titulo: '',
    autor: '',
    genero: '',
    ano: '',
    avaliacao: ''
  });

  useEffect(() => {
    if (route.params?.livro) setForm(route.params.livro);
  }, [route.params]);

  const salvar = async () => {
    const livros = JSON.parse(await AsyncStorage.getItem('livros')) || [];
    let novos;

    if (form.id) {
      // Editando
      novos = livros.map((l) => (l.id === form.id ? form : l));
    } else {
      // Criando novo
      const novoLivro = { ...form, id: Date.now().toString() };
      novos = [...livros, novoLivro];
    }

    await AsyncStorage.setItem('livros', JSON.stringify(novos));
    navigation.navigate('Livros');
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <TextInput
        label="Título"
        value={form.titulo}
        onChangeText={(v) => setForm({ ...form, titulo: v })}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Autor"
        value={form.autor}
        onChangeText={(v) => setForm({ ...form, autor: v })}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Gênero"
        value={form.genero}
        onChangeText={(v) => setForm({ ...form, genero: v })}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Ano"
        value={form.ano}
        keyboardType="numeric"
        onChangeText={(v) => setForm({ ...form, ano: v })}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Avaliação (1 a 5)"
        value={form.avaliacao}
        keyboardType="numeric"
        onChangeText={(v) => setForm({ ...form, avaliacao: v })}
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={salvar}>
        Salvar
      </Button>
    </ScrollView>
  );
}
