// DetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView } from 'react-native';

const CallScreen = () => {
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
        <Text style={{ color: 'black', fontSize: 20 }}>Calls</Text>
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
          <Image source={require('../Images/Icon/call-user.png')} />
        </Pressable>
      </View>
      <FlatList
        style={{ width: '100%', backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13]}
        renderItem={({ item }) => {
          return (
            <Pressable style={{ width: '100%', height: 50, backgroundColor: 'white', marginVertical:5 }}
              onPress={() => { console.log('Pressed') 
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 45, height: 45, borderRadius: 100, marginRight:10, marginLeft:20 }} source={{ uri: 'https://thegioiso.edu.vn/wp-content/uploads/2023/11/hinh-anh-gai-xinh-cute-1.jpg' }} />
                  <View>
                    <Text style={{ color: 'black' }}>Tên</Text>
                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>Today, 09:30 AM</Text>
                  </View>
                </View>
                <View style={{ alignItems:'center', flexDirection:'row'}}>
                  <Pressable>
                    <Image source={require('../Images/Icon/Call.png')} />
                  </Pressable>
                  <Pressable style = {{marginLeft:20, marginRight:20}}>
                    <Image source={require('../Images/Icon/Video.png')} />
                  </Pressable>
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

export default CallScreen;