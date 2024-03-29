// DetailsScreen.tsx
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable
} from 'react-native';

const CONTACTS = [
  {
    img: 'https://vienthammydiva.vn/wp-content/uploads/2022/05/gai-xinh-han-quoc-29-1.jpg',
    name: 'Nguyễn Thanh Trúc',
    phone: '+1 (972) 566-2684',
  },
  {
    img: 'https://genzrelax.com/wp-content/uploads/2022/03/anh-gai-xinh-deo-mat-kinh-1.jpg',
    name: 'Lê Ngọc Anh',
    phone: '+1 (845) 456-2237',
  },
  {
    img: 'https://raonhanh365.vn/pictures/detail/2022/08/16/3381247845172034560.jpg',
    name: 'Diệu Linh',
    phone: '+1 (959) 422-3635',
  },
  {
    img: 'https://pbs.twimg.com/profile_images/1438035897430130688/f4vDy5Bd_400x400.jpg',
    name: 'Nguyễn Thị Hồng',
    phone: '+1 (951) 472-2967',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGvIbAUr1Nm-3kUPbS548jijOx0s0y5RMJw&usqp=CAU',
    name: 'Phan Thị Lệ Trinh',
    phone: '+1 (887) 478-2693',
  },
  {
    img: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Shelby Ballard',
    phone: '+1 (824) 467-3579',
  },
  {
    img: 'https://www.ldg.com.vn/media/uploads/uploads/02005614-hinh-anh-co-gai-xinh-dep.jpg',
    name: 'Lệ Rose',
    phone: '+1 (862) 581-3022',
  },
  {
    img: 'https://vienthammydiva.vn/wp-content/uploads/2023/11/gai-xinh-viet-nam-3.jpg',
    name: 'Lưu Trinh',
    phone: '+1 (913) 497-2020',
  },
  {
    img: 'https://hot51.org/wp-content/uploads/2022/09/xem-anh-gai-xinh-cute-nhat-qua-dat.jpg',
    name: 'Hoàng Lan',
    phone: '+1 (913) 497-2020',
  },
  {
    img: 'https://timnhadat.s3-ap-southeast-1.amazonaws.com/images/raovat/2022/08/16/133051071448705943-28.jpg',
    name: 'Trần Xinh',
    phone: '+1 (913) 497-2020',
  },
  {
    img: 'https://tophinhanh.net/wp-content/uploads/2023/11/anh-gai-k8-xinh-1.jpg',
    name: 'Vân Zinh',
    phone: '+1 (913) 497-2020',
  },
];

const ContactScreen = () => {
  const sections = React.useMemo(() => {
    const sectionsMap = CONTACTS.reduce((acc, item) => {
      const [lastName] = item.name.split(' ').reverse();

      return Object.assign(acc, {
        [lastName[0]]: [...(acc[lastName[0]] || []), item],
      });
    }, {});

    return Object.entries(sectionsMap)
      .map(([letter, items]) => ({
        letter,
        items,
      }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
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
        <Text style={{ color: 'black', fontSize: 20 }}>Contacts</Text>
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
          <Image source={require('../Images/Icon/user-add.png')} />
        </Pressable>
      </View>
      <ScrollView style={{height:700}}>
        <Text style={{marginLeft:20, color:'black', fontSize:16}}>My contact</Text>
        {sections.map(({ letter, items }) => (
          <View style={styles.section} key={letter}>
            <Text style={styles.sectionTitle}>{letter}</Text>
            <View style={styles.sectionItems}>
              {items.map(({ img, name, phone }, index) => {
                return (
                  <View key={index} style={styles.cardWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}>
                      <View style={styles.card}>
                        {img ? (
                          <Image
                            alt=""
                            resizeMode="cover"
                            source={{ uri: img }}
                            style={styles.cardImg} />
                        ) : (
                          <View style={[styles.cardImg, styles.cardAvatar]}>
                            <Text style={styles.cardAvatarText}>{name[0]}</Text>
                          </View>
                        )}

                        <View style={styles.cardBody}>
                          <Text style={styles.cardTitle}>{name}</Text>

                          <Text style={styles.cardPhone}>{phone}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Section */
  section: {
    marginTop: 12,
    paddingLeft: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  sectionItems: {
    marginTop: 8,
  },
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 3,
  }
});
export default ContactScreen;