// DetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView } from 'react-native';

const MessageScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft:20,
        paddingRight:20,
      }}>
        <Pressable style={{
          width: 37,
          height: 37,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          borderWidth: 0.3,
          borderColor: 'black',
        }} onPress={() => { }}>
          <Image source={require('../Images/Icon/Vector.png')} />
        </Pressable>
        <Text style={{ color: 'black', fontSize: 20 }}>Home</Text>
        <Image style={{ width: 45, height: 45, borderRadius: 100 }} source={{ uri: 'https://thegioiso.edu.vn/wp-content/uploads/2023/11/hinh-anh-gai-xinh-cute-1.jpg' }} />
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