import {
  CustomImage,
  CustomTouchable,
  MainContainer,
  Text,
} from '@src/components';
import {useTypedSelector} from '@src/hooks';
import {SD} from '@src/utils';
import React from 'react';
import {FlatList, View} from 'react-native';
import Video from 'react-native-video';

type Reel = {id: string; uri: string; liked: boolean};

const reels: Reel[] = [
  {id: '1', uri: 'https://www.w3schools.com/html/mov_bbb.mp4', liked: false},
  {id: '2', uri: 'https://www.w3schools.com/html/mov_bbb.mp4', liked: false},
  {id: '3', uri: 'https://www.w3schools.com/html/mov_bbb.mp4', liked: false},
];

export const Feeds = () => {
  const user = useTypedSelector(state => state.auth.user);
  console.log('user in profile:', user);

  const renderItem = ({item}: {item: Reel}) => (
    <View style={{marginBottom: 20}}>
      <Video
        source={{uri: item.uri}}
        style={{width: '100%', height: 300}}
        resizeMode="cover"
        repeat
        paused={false}
        muted
      />
      <CustomTouchable>
        <Text>❤️ Like</Text>
      </CustomTouchable>
    </View>
  );

  return (
    <MainContainer isFlatList>
      <FlatList
        ListHeaderComponent={() =>
          user && (
            <View style={{alignItems: 'center', marginVertical: 20}}>
              {user.avatar && (
                <CustomImage
                  source={{uri: user.avatar}}
                  style={{
                    width: SD.hp(80),
                    height: SD.hp(80),
                    borderRadius: SD.hp(40),
                    marginBottom: SD.hp(10),
                  }}
                />
              )}
              <Text bold size={20}>
                {user.name}
              </Text>
              <Text size={26} bold></Text>
            </View>
          )
        }
        data={reels}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </MainContainer>
  );
};
