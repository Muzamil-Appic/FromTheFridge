import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HomeSearch from '../../Assets/Icons/HomeSearch';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//global 
import FontSize from '../../Global/FontSizes';
import Colors from '../../Global/Colors';
//svg
import HomeSvg from '../../Assets/Icons/HomeSvg.svg';
import FruitThings from '../../Assets/Icons/FruitThings.svg';
import Ingredients from '../../Assets/Icons/Ingredients.svg';
//homestyle
import Styles from './Home.Styles';

//firebase
import firestore from '@react-native-firebase/firestore';



export default function Home({ navigation }) {

  //states

  const [quickitchen, setquickitchen] = useState(true);
  const [fullKitchen, setfullKitchen] = useState(false);
  const [qkroundd, setqkroundd] = useState(true);
  const [fkround, setfkround] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ingredients, setingridents] = useState('Select');
  const [kitchenData, setkitchenData] = useState([])
  const [FullKitchenData, setFullKitchenData] = useState([])
  const [dropdownitems, setdropdownitems] = useState([])
  const [totalitems, settotalitems] = useState(0)
  const isFocused = useIsFocused();


  const empty = () => {
    settotalitems(0)
  }


  useEffect(() => {
    empty()
    QuickKitchenDatafunction();
    FullKitchenDatafunction();
    DropDownListGetFunction();
    asun()

  }, [isFocused]);

  const QuickKitchenDatafunction = async () => {
    // const subscriber = 
    firestore()
      .collection('FridgeIngredients').where('itemspecification', '!=', 'fullkitchen')
      .onSnapshot(querySnapshot => {
        const kitchenData = [];
        querySnapshot.forEach(documentSnapshot => {
          kitchenData.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setkitchenData(kitchenData);

      });

    // Unsubscribe from events when no longer in use
    // return () => subscriber();

  }

  const FullKitchenDatafunction = async () => {
    // const subscriber = 
    firestore()
      .collection('FridgeIngredients').where('itemspecification', '==', 'fullkitchen')
      .onSnapshot(querySnapshot => {
        const FullKitchenData = [];
        querySnapshot.forEach(documentSnapshot => {
          FullKitchenData.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setFullKitchenData(FullKitchenData);

      });

    // Unsubscribe from events when no longer in use
    // return () => subscriber();

  }

  const DropDownListGetFunction = async () => {
    // const subscriber = 
    firestore()
      .collection('Category')
      .onSnapshot(querySnapshot => {
        const dropdownitems = [];
        querySnapshot.forEach(documentSnapshot => {
          dropdownitems.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setdropdownitems(dropdownitems);

      });

    // Unsubscribe from events when no longer in use
    // return () => subscriber();

  }


  const GetDataWithDropDown = async (cat) => {
    setModalVisible(false),
      setingridents(cat)
    //console.log("Yeah get kr rahy hain hum---->", cat);
    firestore()
      .collection('FridgeIngredients').where('category', '==', cat)
      .onSnapshot(querySnapshot => {
        const FullKitchenData = [];
        querySnapshot.forEach(documentSnapshot => {
          FullKitchenData.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setFullKitchenData(FullKitchenData);

      });


  }


  const fullkitchenenabled = () => {
    setfullKitchen(true);
    setquickitchen(false);
    setfkround(true);
    setquickitchen(false);
  };
  const quickitchenenabled = () => {
    setquickitchen(true);
    setfullKitchen(false);
    setqkroundd(true);
    setfkround(false);
  };


  const newrenderfunction = ({ item, index }) => {
    // console.log({ item, index });
    return (
      <View style={{ height: hp(6), width: wp(47.7), justifyContent: 'center', borderColor: Colors.purple }}>
        <TouchableOpacity onPress={() => { quickcheckedvalue(item, index) }}
          style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'flex-start' }}>
          <Text
            numberOfLines={1}
            style={Styles.renderfunctiontext}>{item.itemname}</Text>

          {item.selected ?

            <AntDesign
              name="checkcircle"
              color={Colors.purple}
              size={15}
              style={{ position: 'absolute', right: 10 }}
            />
            :
            <Entypo
              name="circle"
              size={15}
              style={{ position: 'absolute', right: 10 }}
            />}
        </TouchableOpacity>
      </View>
    );
  };
  const fullkitchenrender = ({ item, index }) => {
    //  console.log(item);
    return (
      <View style={{ height: hp(6), width: wp(47.5), justifyContent: 'center', borderColor: Colors.purple }}>
        <TouchableOpacity
          onPress={() => fullcheckvalue(item, index)}
          style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'flex-start' }}>
          <Text numberOfLines={1} style={Styles.renderfunctiontext}>{item.itemname}</Text>
          {item.selected ?
            <AntDesign
              name="checkcircle"
              color={Colors.purple}
              size={15}
              style={{ position: 'absolute', right: 10 }}
            />
            :
            <Entypo
              name="circle"
              size={15}
              style={{ position: 'absolute', right: 10 }}
            />}
        </TouchableOpacity>
      </View>
    );
  };
  const modalfunction = ({ item }) => {
    // console.log("----------->DropDown",item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => [

            GetDataWithDropDown(item.category)
          ]}>
          <View
            style={{
              paddingVertical: hp(1.5),
              width: wp(60),

              flexDirection: 'row',

              alignItems: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: FontSize.font16,
                color: Colors.black,
                left: 10,
              }}>
              {item.category}
            </Text>
            <Entypo name="circle" size={15} style={{ right: 10 }} />

          </View>
        </TouchableOpacity>
      </View>
    );
  };


  const quickcheckedvalue = (item, index) => {
    let temp = [...kitchenData]
    if (item.selected) {
      item.selected = false;
      settotalitems(totalitems - 1)
    }
    else {
      item.selected = true;
      settotalitems(totalitems + 1)
    }
    temp[index] = item;
    setkitchenData(temp)
  }
  const fullcheckvalue = (item, index) => {
    let temp = [...FullKitchenData]
    if (item.selected) {
      item.selected = false;
      settotalitems(totalitems - 1)
    }
    else {
      item.selected = true;
      settotalitems(totalitems + 1)
    }
    temp[index] = item;
    setFullKitchenData(temp)
  }



  const funk=()=>{
if (totalitems===0) {
  alert("Please Select An Item First")
  return;
  
}
    navigation.navigate('Selectedingredients', { FullKitchenData, kitchenData, })
  }


  // const FullKitchenData = [
  //   { id: 1, Name: 'AllSpice' },
  //   { id: 2, Name: 'Salt' },
  //   { id: 3, Name: 'AllSpice' },
  //   { id: 4, Name: 'Salt' },
  //   { id: 5, Name: 'AllSpice' },
  //   { id: 6, Name: 'Salt' },
  //   { id: 7, Name: 'AllSpice' },
  //   { id: 8, Name: 'Salt' },
  //   { id: 9, Name: 'AllSpice' },
  //   { id: 10, Name: 'Salt' },
  //   { id: 11, Name: 'AllSpice' },
  //   { id: 12, Name: 'Salt' },
  //   { id: 13, Name: 'AllSpice' },
  //   { id: 14, Name: 'Salt' },
  //   { id: 15, Name: 'AllSpice' },
  //   { id: 16, Name: 'Salt' },
  //   { id: 17, Name: 'AllSpice' },
  //   { id: 18, Name: 'Salt' },
  //   { id: 19, Name: 'AllSpice' },
  //   { id: 20, Name: 'Salt' },
  //   { id: 21, Name: 'AllSpice' },
  //   { id: 22, Name: 'Salt' },
  //   { id: 23, Name: 'AllSpice' },
  //   { id: 24, Name: 'Salt' },
  //   { id: 25, Name: 'Salt' },
  // ];

  // const KitchenData = [
  //   {id: 1, Name: 'Apple'},
  //   {id: 2, Name: 'Bread'},
  //   {id: 3, Name: 'Apple'},
  //   {id: 4, Name: 'Bread'},
  //   {id: 5, Name: 'Apple'},
  //   {id: 6, Name: 'Bread'},
  //   {id: 7, Name: 'Apple'},
  //   {id: 8, Name: 'Bread'},
  //   {id: 9, Name: 'Apple'},
  //   {id: 10, Name: 'Bread'},
  //   {id: 11, Name: 'Apple'},
  //   {id: 12, Name: 'Bread'},
  //   {id: 13, Name: 'Apple'},
  //   {id: 14, Name: 'Bread'},
  //   {id: 15, Name: 'Apple'},
  //   {id: 16, Name: 'Bread'},
  //   {id: 17, Name: 'Apple'},
  //   {id: 18, Name: 'Bread'},
  //   {id: 19, Name: 'Apple'},
  //   {id: 20, Name: 'Bread'},
  //   {id: 21, Name: 'Apple'},
  //   {id: 22, Name: 'Bread'},
  //   {id: 23, Name: 'Apple'},
  //   {id: 24, Name: 'Bread'},
  //   {id: 25, Name: 'Apple'},
  //   {id: 26, Name: 'Bread'},
  //   {id: 27, Name: 'Apple'},
  //   {id: 28, Name: 'Bread'},
  //   {id: 29, Name: 'Apple'},
  //   {id: 30, Name: 'Bread'},
  // ];
  // const ITEMS = [
  //   { id: 0, itemname: 'Select' },
  //   { id: 1, itemname: 'Diary' },
  //   { id: 2, itemname: 'Snack' },
  //   { id: 3, itemname: 'Pasta' },
  //   { id: 4, itemname: 'Pasta' },
  //   { id: 6, itemname: 'Pasta' },
  //   { id: 7, itemname: 'Pasta' },
  //   { id: 8, itemname: 'Pasta' },
  //   { id: 9, itemname: 'Pasta' },
  //   { id: 10, itemname: 'Pasta' },
  //   { id: 11, itemname: 'Pasta' },
  // ];


const asun=async()=>{
  await AsyncStorage.getItem('userdetails').then(async value => {
    let data = JSON.parse(value);
    console.log("------>",data);

   })
  }

  return (
    <SafeAreaView style={Styles.Container}>
      <View>
        <Text style={Styles.toptext}>FromTheFridge</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: Colors.purple,
            backgroundColor: Colors.homebackcolor,
            alignItems: 'center',
          }}>
          <View style={{ top: 6 }}>
            <Ingredients width={'280px'} height={'25px'} />
          </View>
          <View style={{ top: 5 }}>
            <FruitThings height={'110px'} width={'227px'} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: hp(1) }}>
          <View
            style={{
              flexDirection: 'row',
              width: wp(60),
              justifyContent: 'space-around',
              marginLeft: wp(22),
              marginBottom: hp(1),
            }}>
            {quickitchen ? (
              <TouchableOpacity
                style={Styles.btn}
                onPress={() => quickitchenenabled()}>
                <Text style={Styles.btntext}>Quick Kitchen</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.btnwithoutround}
                onPress={() => quickitchenenabled()}>
                <Text style={Styles.btntext}>Quick Kitchen</Text>
              </TouchableOpacity>
            )}
            {fkround ? (
              <TouchableOpacity
                style={Styles.btn}
                onPress={() => fullkitchenenabled()}>
                <Text style={Styles.btntext}>Full Kitchen</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.btnwithoutround}
                onPress={() => fullkitchenenabled()}>
                <Text style={Styles.btntext}>Full Kitchen</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity style={{ paddingHorizontal: wp(12), padding: 10, right: 10, bottom: 5 }} onPress={() => navigation.navigate('Search')}>
              <HomeSearch height={'18.39px'} width={'18.39px'} />
            </TouchableOpacity>
          </View>
        </View>

        {quickitchen ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginHorizontal: hp(1),
                flex: 1,
                marginBottom: hp(8),
              }}>
              <View
                style={{
                  flex: 1,
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderColor: Colors.purple,
                  marginBottom: 20,

                  borderRightWidth: 1,

                }}>
                <FlatList
                  numColumns={2}
                  data={kitchenData}
                  renderItem={newrenderfunction}
                  keyExtractor={item => item.itemid}
                  contentContainerStyle={{ justifyContent: 'center' }}
                />
              </View>
            </View>
          </View>
        ) : null}

        {fullKitchen ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginHorizontal: wp(2.5),
                borderRadius: 10,
                borderWidth: 1,
                paddingHorizontal: hp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: Colors.dark,
                marginBottom: hp(1),
              }}>
              <Text
                style={{
                  fontSize: FontSize.fon15,
                  color: Colors.black,
                  left: 12,
                }}>
                {ingredients}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ right: 12 }}>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={30}
                  color={Colors.black}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginHorizontal: hp(1),
                flex: 1,
                marginBottom: hp(11),
              }}>
              <View
                style={{
                  flex: 1,
                  borderLeftWidth: 1,

                  borderTopWidth: 1,
                  borderColor: Colors.purple,
                  borderRightWidth: 1
                }}>
                <FlatList
                  numColumns={2}
                  data={FullKitchenData}
                  renderItem={fullkitchenrender}
                  keyExtractor={item => item.itemid}
                />
              </View>
            </View>
          </View>
        ) : null}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: Colors.White,
            borderWidth: 0.2,
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp(25),
            marginHorizontal: wp(20),
          }}>
          <FlatList
            data={dropdownitems}
            renderItem={modalfunction}
            keyExtractor={item => item.itemid}
          />
        </View>
      </Modal>

      <View style={{ position: 'absolute', bottom: hp(11), right: wp(12) }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.green,
            borderRadius: 100,
            height: 52,
            width: 52,
            justifyContent: 'center',
          }}
          onPress={()=>funk()}>
          <Text
            style={{ fontSize: 25, color: Colors.White, textAlign: 'center' }}>
            {totalitems}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}