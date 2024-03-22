import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Message = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
          <Pressable
            onPress={() => { navigation.goBack() }}
          >
            <Image source={require('../Images/IconViewMessage/Left.png')} />
          </Pressable>
          <Image style={{ width: 45, height: 45, borderRadius: 100, marginLeft: 15, marginRight: 10 }} source={{ uri: 'https://shopbanphim.com/wp-content/uploads/2023/12/anh-gai-xinh-tiktok.jpg' }} />
          <View>
            <Text style={{ color: 'black', fontSize: 16 }}>Trương Văn Tuấn</Text>
            <Text style={{ color: 'gray', fontSize: 12, fontWeight: 'bold' }}>Active now</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
          <Image source={require('../Images/IconViewMessage/Call.png')} />
          <Image style={{ marginLeft: 15 }} source={require('../Images/IconViewMessage/Video.png')} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ width: '90%', marginTop: 20, height:"80%" }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>Hello</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>How are you?</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm fine, thank you</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>What are you doing?</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>Hello</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>How are you?</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm fine, thank you</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>What are you doing?</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>Hello</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>How are you?</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm fine, thank you</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>What are you doing?</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
          <View style={{ backgroundColor: '#F3F6F6', borderRadius: 10, width: '60%', padding: 10, marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>I'm working</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // height: 40,
        marginBottom: 30,
        paddingTop: 30
      }}>
        <Pressable style={{marginRight:10}}>
          <Image source={require('../Images/IconViewMessage/Path.png')} />
        </Pressable>
        <View style={{flexDirection:'row', alignItems:'center',  backgroundColor: '#F3F6F6', borderRadius: 10,width:'60%',paddingHorizontal:10}}>
          <TextInput placeholder='Write your message' style={{ width: '90%', height: 40 }} />
          <Image source={require('../Images/IconViewMessage/Paste.png')} />
        </View>
        <Pressable style={{marginRight:20, marginLeft:10}}>
          <Image source={require('../Images/IconViewMessage/camera.png')} />
        </Pressable>
        <Pressable style={{marginRight:0}}>
          <Image source={require('../Images/IconViewMessage/Mic.png')} />
        </Pressable>
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

export default Message;