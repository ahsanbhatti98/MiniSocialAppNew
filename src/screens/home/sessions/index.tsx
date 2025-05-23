import {CustomTouchable, FloatingBtn, MainContainer} from '@src/components';
import {NavigationService} from '@src/config';
import {useChatSessions, useCreateSession} from '@src/hooks/api';
import {ChatHistoryResponseType, SessionListResponseType} from '@src/models';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const Sessions = () => {
  const {mutate: createSession} = useCreateSession();

  const {
    data: sessions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useChatSessions({enabled: true});
  // } = useChatSessions({enabled: true});

  // console.log('sessions', sessions);

  const renderItem = ({item}: {item: SessionListResponseType}) => (
    <CustomTouchable
      style={styles.itemStyles}
      onPress={() => {
        NavigationService.navigate('App', {
          screen: 'Chat',
          params: {
            sessionId: item?.id,
          },
        });
      }}>
      <Text>Session ID: {item.id}</Text>
      <Text>Created At: {item.created_at}</Text>
    </CustomTouchable>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) {
      return null;
    }
    return (
      <View style={{padding: 16}}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.error}>
        <Text>Something went wrong.</Text>
        <CustomTouchable onPress={() => refetch()}>
          <Text style={{color: 'blue'}}>Tap to retry</Text>
        </CustomTouchable>
      </View>
    );
  }

  return (
    <MainContainer isFlatList>
      <FlatList
        data={sessions as ChatHistoryResponseType[] | []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 16}}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
      <FloatingBtn onPress={() => createSession()} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  itemStyles: {padding: 16, borderBottomWidth: 1, borderColor: '#ccc'},
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  error: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
