import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MarkSvg from '../Assets/Icons/MarkSvg.svg'
import ForwardSvg from '../Assets/Icons/ForwardSvg.svg'
import { useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ActivityLoader from '../Components/ActivityLoader'
import Feather from 'react-native-vector-icons/Feather'





import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from './Search.Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Global/Colors';
import FontSize from '../Global/FontSizes';
import { responsiveHeight as rh, responsiveWidth as rw, responsiveFontSize as sz } from 'react-native-responsive-dimensions'





export default function Search({ navigation }) {
  const isFocused = useIsFocused()
 


  const [record, setrecord] = useState([])
  const [txtinputalue, settxtinputalue] = useState('')
  const [loader, setloader] = useState(false)

  useEffect(() => {
    if (txtinputalue === '') {
      settxtinputalue('')
      setrecord('')
    }

  }, [isFocused])



  const nextfunction = (item) => {
    console.log("its our items taht get",item);
    // setrecord('')
    // settxtinputalue('')
    navigation.navigate('RecipiesDescription', item)
  }

  const renderfunction = ({ item }) => {
    console.log("___________________>", item);
    return (
      <View  >
        {item.id == 0 ? (
          <View>
            <Text>NO Recipie Available</Text>
          </View>
        )
          :
          (
            <View style={Styles.renderfunctionmainview}>
              {/* <View >
                <Image source={{ uri: item.image }} style={Styles.renderimage} />
              </View> */}





              <View style={{ height: rh(5), width: rw(80), left: rw(2) }}>
                <View style={{ height: rh(5), justifyContent: "center" }}>
                  <Text numberOfLines={1} style={{ fontSize: FontSize.font16, color: Colors.black, fontWeight: '700', width: rw(70) }}>{item?.title}</Text>
                </View>


              </View>

              <View style={{ height: rh(5), justifyContent: "space-around" }}>
                {/* <View style={{ marginTop: rh(1) }}>
                  <MarkSvg height={'21.75px'} width={'19px'} />
                </View> */}
                <TouchableOpacity onPress={() => nextfunction(item)}>
                  <ForwardSvg height={'25px'} width={'25px'} />
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </View>

    )
  }



  const siz = Dimensions.get('window').height;



  const apitest = async () => {

    setloader(true)
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '1d12012fc9msh21199db8ef72d70p1d0f8ajsnbbf3d57a2632'
      }
    };


    await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/autocomplete?query=${txtinputalue}&number=20`, options)

      .then(response => response.json())
      .then(response => { console.log(response), setrecord(response) })
      .catch(err => console.error(err));
    //   recoed.push(pushrecord)
    setloader(false)




  }




  return (
    <SafeAreaView style={Styles.Container}>
      <View style={Styles.searchview}>
        <Text style={Styles.searchtext}>SEARCH</Text>
      </View>
      <View style={{ marginTop: rh(1), marginHorizontal: rw(2), borderWidth: 1, borderColor: '#606060CC', borderRadius: 5, flexDirection: "row", justifyContent: "space-between" }}>

        <TextInput
          value={txtinputalue}
          placeholder="Search"
          style={{ width: rw(87), paddingLeft: rw(5), color: Colors.black, fontSize: siz * 0.025, paddingHorizontal: rh(1) }}
          placeholderTextColor={'#AEACAC'}
          onChangeText={value => { settxtinputalue(value), console.log(value); }}
        />
        <TouchableOpacity onPress={() => apitest()} style={{ height: rh(6.5), alignSelf: "center", justifyContent: 'center', right: rw(3) }}>
          <AntDesign name='search1' size={siz * 0.03} color={Colors.purple} />
        </TouchableOpacity>
      </View>


      <View style={{ flex: 1, marginBottom: rh(10) }}>

        {loader ?
          <ActivityLoader />
          :
          <FlatList
            data={record}
            keyExtractor={item => item.id}
            renderItem={renderfunction}
            contentContainerStyle={{ paddingBottom: rh(2) }}
          />
        }
      </View>

    </SafeAreaView>
  );
}

