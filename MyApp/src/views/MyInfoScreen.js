import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, Pressable} from 'react-native';

const MyInfoScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'white',
          width: '100%',
          height: 60,
          marginTop: 20,
          marginBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Pressable
          style={{
            width: 37,
            height: 37,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require('../Images/Icon/Left.png')} />
        </Pressable>
      </View>
      <Image
        style={{width: 85, height: 85, borderRadius: 100}}
        source={{
          uri: 'https://i.pinimg.com/564x/c1/9a/1d/c19a1d3823b60a19194fe700f0524ae6.jpg',
        }}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        Trương Văn Tuấn
      </Text>
      <Text
        style={{color: 'gray', fontSize: 15, fontWeight: 'bold', marginTop: 5}}>
        @tuaans.0204
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '70%',
          justifyContent: 'space-around',
          marginVertical: 20,
        }}>
        <Pressable
          style={{backgroundColor: 'black', padding: 10, borderRadius: 100}}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../Images/ProfileIcon/Message.png')}
          />
        </Pressable>

        <Pressable
          style={{backgroundColor: 'black', padding: 10, borderRadius: 100}}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../Images/ProfileIcon/Video.png')}
          />
        </Pressable>

        <Pressable
          style={{backgroundColor: 'black', padding: 10, borderRadius: 100}}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../Images/ProfileIcon/Call.png')}
          />
        </Pressable>

        <Pressable
          style={{backgroundColor: 'black', padding: 10, borderRadius: 100}}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../Images/ProfileIcon/More.png')}
          />
        </Pressable>
      </View>
      <View style={{width: '100%', marginLeft: 70, marginBottom: 10}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Display Name
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
          Trương Văn Tuấn
        </Text>
      </View>

      <View style={{width: '100%', marginLeft: 70, marginBottom: 10}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Email Address
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
          truongvantuanIUH@gmail.com
        </Text>
      </View>

      <View style={{width: '100%', marginLeft: 70, marginBottom: 10}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Address
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
          123 Quang Trung, Phường 11, Gò Vấp, TP.HCM
        </Text>
      </View>

      <View style={{width: '100%', marginLeft: 70, marginBottom: 10}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Phone number
        </Text>
        <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
          +(84) 345231231
        </Text>
      </View>
      <View style={{width: '100%', marginLeft: 70, marginBottom: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: 'gray',
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Media Shared
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 15,
              fontWeight: '500',
              marginTop: 10,
              marginRight: 60,
            }}>
            View All
          </Text>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'white',
                  margin: 10,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 95, height: 95, borderRadius: 10}}
                  source={{
                    uri: 'https://i.pinimg.com/564x/c1/9a/1d/c19a1d3823b60a19194fe700f0524ae6.jpg',
                  }}
                />
              </View>
            );
          }}
        />
      </View>
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

export default MyInfoScreen;
