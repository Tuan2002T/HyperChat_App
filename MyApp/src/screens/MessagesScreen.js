// DetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';

import SvgIcons from '../assets/SvgIcons';

const MessagesScreen = ({navigation}) => {


const MessageScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '10%',
          backgroundColor: 'lightgrey',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <SvgIcons name="search" width={24} height={24} />
          <TextInput style={{fontSize: 16}} placeholder="Search" />
        </View>
        <View>
          <Text>Home</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <SvgIcons name="qr" width={24} height={24} />
          <SvgIcons name="plus" width={24} height={24} />
        </View>

      </View>

      {/* <View style={{ height: 100 }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={({ item }) => {
            return (
              <View style={{ width: 50, height: 50, backgroundColor: 'white', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 45, height: 45, borderRadius: 100 }} source={{ uri: 'https://thegioiso.edu.vn/wp-content/uploads/2023/11/hinh-anh-gai-xinh-cute-1.jpg' }} />
                <Text style={{ color: 'black' }}>{item}</Text>
              </View>
            );
          }}
        />

      </View> */}
      <FlatList
        style={{ width: '100%', backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13]}
        renderItem={({ item }) => {
          return (
            <Pressable style={{ width: '100%', height: 50, backgroundColor: 'white', marginVertical:5 }}
              onPress={() => { navigation.navigate('ViewMessage');
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 45, height: 45, borderRadius: 100, marginRight:10, marginLeft:20 }} source={{ uri: 'https://thegioiso.edu.vn/wp-content/uploads/2023/11/hinh-anh-gai-xinh-cute-1.jpg' }} />
                  <View>
                    <Text style={{ color: 'black' }}>Tên</Text>
                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>Tin nhắn mới nhất</Text>
                  </View>
                </View>
                <View style={{ alignItems:'center', marginRight:20}}>
                  <Text style={{ color: 'gray', fontWeight: 'bold' }}>12:00</Text>
                  <View style={{backgroundColor:'#F04A4C', width:20, height:20, alignItems:'center', borderRadius:20}}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>2</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MessageScreen;