import {
  collection,
  FirebaseFirestoreTypes,
  getDocs,
} from '@react-native-firebase/firestore';
import {
  CustomImage,
  CustomTouchable,
  MainContainer,
  Text,
} from '@src/components';
import {useTypedSelector} from '@src/hooks';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {db} from '../../../../firebaseConfig';
import {NavigationService} from '@src/config';

export const Sessions = () => {
  const [users, setUsers] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const currentUser = useTypedSelector(state => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const allUsers = querySnapshot.docs.map(doc => doc.data());

      // Exclude current user
      const otherUsers = allUsers.filter(u => u.uid !== currentUser?.uid);
      setUsers(otherUsers || []);
    };

    fetchUsers();
  }, []);

  const handleChat = (receiver: any) => {
    console.log('Navigating to chat with:', receiver);
    NavigationService.navigate('App', {
      screen: 'Chat',
      params: {
        receiverId: receiver.uid,
      },
    });
  };

  const renderItem = ({item}: any) => (
    <CustomTouchable onPress={() => handleChat(item)} style={styles.itemStyles}>
      <CustomImage
        source={{uri: item.avatar || 'https://i.pravatar.cc/300'}}
        style={{width: 40, height: 40, borderRadius: 20, marginRight: 12}}
      />
      <Text>{item.name}</Text>
    </CustomTouchable>
  );

  return (
    <MainContainer isFlatList>
      <FlatList
        data={users}
        keyExtractor={item => item.uid}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  itemStyles: {padding: 16, flexDirection: 'row', alignItems: 'center'},
});
