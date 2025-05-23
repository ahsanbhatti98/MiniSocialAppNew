import {RouteProp, useRoute} from '@react-navigation/native';
import ChatUrls from '@src/api/chat/api.url';
import {BASE_PATH, BASE_URL} from '@src/api/config';
import {CustomImage, CustomTouchable, Text} from '@src/components';
import {Images} from '@src/config';
import {useChatHistory} from '@src/hooks/api';
import {SD, TokenService} from '@src/utils';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
} from 'react-native-reanimated';
import EventSource from 'react-native-sse';
import 'react-native-url-polyfill/auto';
import uuid from 'react-native-uuid'; // Optional: Better unique IDs
import {ChatRoutesTypes, MessageType} from './chat.types';

export const Chat = () => {
  const route = useRoute<RouteProp<ChatRoutesTypes, 'ChatScreen'>>();
  const {sessionId} = route.params;

  const [accessToken, setAccessToken] = useState<string | null>();

  const getToken = async () => {
    const tokens = await TokenService.getTokens();
    const token = tokens?.accessToken;
    setAccessToken(token);
  };

  const [sendLoader, setSendLoader] = useState(false);
  const [text, setText] = useState('');

  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollRef = useRef<FlatList | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    getToken();
  }, [accessToken]);

  const {
    data: sessions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useChatHistory({enabled: true, sessionId});
  // } = useChatHistory({enabled: true, sessionId: '681c7f8e052b5334d2d4936b'});

  const handleStreamClick = async () => {
    eventSourceRef.current = new EventSource(
      `${BASE_URL}${BASE_PATH}${
        ChatUrls.streamChat
      }?session_id=${sessionId}&user_query=${encodeURIComponent(text)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
      },
    );

    setText('');
    setSendLoader(true);
    let accumulatedText = '';
    const messageId = uuid.v4(); // Better unique ID

    // Create placeholder bot message
    setMessages(prev => [
      {
        _id: messageId,
        text: '',
        createdAt: new Date(),
        user: {_id: 2, name: 'AI'},
      },
      ...prev,
    ]);

    eventSourceRef.current.addEventListener('message', event => {
      try {
        const data = event.data ? JSON.parse(event.data) : null;

        if (data?.event === 'completed') {
          handleStopStream();
          setSendLoader(false);
          return;
        }

        accumulatedText += data?.data || '';

        setMessages(prev =>
          prev.map(msg =>
            msg._id === messageId ? {...msg, text: accumulatedText} : msg,
          ),
        );
      } catch (error) {
        console.log('SSE parse error:', error);
        handleStopStream();
        setSendLoader(false);
      }
    });
  };

  const handleStopStream = () => {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
  };

  const handleSend = async () => {
    if (!text.trim()) {
      return;
    }
    const newMsg = {
      _id: uuid.v4(),
      text: text.trim(),
      createdAt: new Date(),
      user: {_id: 1, name: 'You'},
    };
    setMessages(prev => [newMsg, ...prev]);
    await handleStreamClick();
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: '100%',
    };
  });
  const renderMessage = ({item}: {item: MessageType}) => {
    const isUser = item.user._id === 1;
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}>
        <Animated.View
          entering={(isUser ? SlideInRight : SlideInLeft)
            .springify()
            .damping(15)
            .mass(0.5)}
          style={animatedStyles}>
          <Text>{item.text}</Text>
        </Animated.View>
      </View>
    );
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current?.scrollToOffset({animated: true, offset: 0});
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          ref={scrollRef}
          data={[...messages, ...((sessions as MessageType[]) || [])]}
          keyExtractor={item => item._id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
          inverted
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={1}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size="small" /> : null
          }
        />
      )}

      {/* Input Toolbar */}
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={text}
          onChangeText={setText}
          placeholder="Ask your AI assistant..."
          placeholderTextColor="#aaa"
          style={styles.textInput}
        />
        {sendLoader ? (
          <ActivityIndicator
            style={{marginLeft: 10}}
            size="small"
            color="black"
          />
        ) : (
          <CustomTouchable onPress={handleSend} hitSlop={10}>
            <CustomImage source={Images.AddIcon} style={styles.sendIcon} />
          </CustomTouchable>
        )}
      </View>
    </SafeAreaView>
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
