// DetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';

const CallScreen = ({navigation}) => {
  const handleMenu = () => {
    navigation.navigate('SettingScreen');
    console.log('Menu');
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Calls"
        leftIcon="menu"
        leftIconPress={handleMenu}
      />
      
      <FlatList
        style={{marginTop: 10, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
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