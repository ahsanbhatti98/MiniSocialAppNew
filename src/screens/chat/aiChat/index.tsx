import {useTypedSelector} from '@src/hooks';
import {SD} from '@src/utils';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ChatRoutesTypes} from './chat.types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import {db} from '../../../../firebaseConfig';
import {GiftedChat} from 'react-native-gifted-chat';

type Message = {
  _id: string;
  text: any;
  createdAt: any;
  user: any;
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const route = useRoute<RouteProp<ChatRoutesTypes, 'ChatScreen'>>();
  const receiverId = route.params?.receiverId; // You must pass this from previous screen

  console.log('Chat screen receiverId:', receiverId);

  const user = useTypedSelector(state => state.auth.user);

  const chatId = [user?.uid, receiverId].sort().join('_'); // stable chatId for both users

  useEffect(() => {
    if (!user?.uid || !receiverId) {
      console.log('User or receiverId not available');
      return;
    }
    // console.log('Chat ID:', chatId,db);
    if (!chatId) return;

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'desc'),
    );

    console.log('Chat query:', q);

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const msgs =
        querySnapshot?.docs?.length > 0
          ? querySnapshot.docs.map(doc => {
              const data = doc?.data?.() || {};
              return {
                _id: doc.id,
                text: data.text,
                createdAt: data.createdAt?.toDate?.() || new Date(),
                user: data.user,
              };
            })
          : [];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(
    (newMessages: Message[] = []) => {
      if (!newMessages[0]) return;
      const {_id, text} = newMessages[0];

      addDoc(collection(db, 'chats', chatId, 'messages'), {
        _id,
        text,
        createdAt: serverTimestamp(),
        user: {
          _id: user?.uid ?? '',
          name: user?.name,
          avatar: user?.avatar || '', // Optional avatar
        },
      });
    },
    [chatId, user],
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: user?.uid ?? 'userAnonymous',
        name: user?.name,
        avatar: user?.avatar || '',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    padding: SD.hp(10),
    paddingTop: SD.hp(20),
  },
  messageBubble: {
    padding: SD.hp(10),
    borderRadius: SD.hp(10),
    marginVertical: SD.hp(5),
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
    // borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    maxHeight: 120,
  },
  sendIcon: {
    width: 26,
    height: 26,
    marginLeft: 10,
    tintColor: 'black',
  },
});
