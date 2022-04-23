import React from 'react';
import {Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container} from './styles';
import Api from '../../Api';

export default () => {
  const navigation = useNavigation();

  handleLogout = async () => {
    await Api.logout();
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <Text>Profile works!</Text>
      <Button title="sair" onPress={handleLogout} />
    </Container>
  );
};
