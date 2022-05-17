import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




//firebase
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


//GLobal Styling
import Styles from './Signup.Styles';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';

//Vector Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
//SVG
import Warn from '../../Assets/Icons/Warn.svg';
export default function Signup({ navigation }) {
  const [firstName, setfirstName] = useState('');
  const [sureName, setsureName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [country, setcountry] = useState('Country');
  const [city, setcity] = useState('');
  const [address, setaddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(true);
  const [loader, setloader] = useState(false)


  //validations
  const [validatefirstname, setvalidatefirstname] = useState(false)
  const [validatesurename, setvalidatesurename] = useState(false)
  const [validateemail, setvalidateemail] = useState(false)
  const [validatepassword, setvalidatepassword] = useState(false)
  const [validaeconfirmpassword, setvalidaeconfirmpassword] = useState(false)
  const [validatemobile, setvalidatemobile] = useState(false)
  const [validatecountry, setvalidatecountry] = useState(false)
  const [validatecity, setvalidatecity] = useState(false)
  const [validateaddress, setvalidateaddress] = useState(false)

  const Countries = [
    {
      id: '0',
      countryname: 'country',
    },
    {
      id: '1',
      countryname: 'Pakistan',
    },

    {
      id: '2',
      countryname: 'China',
    },
    {
      id: '3',
      countryname: 'America',
    },
    {
      id: '4',
      countryname: 'Japan',
    },
    {
      id: '5',
      countryname: 'Brazil',
    },
    {
      id: '6',
      countryname: 'Vitnam',
    },
    {
      id: '7',
      countryname: 'England',
    },
    {
      id: '8',
      countryname: 'UEA',
    },
    {
      id: '9',
      countryname: 'Russia',
    },
    {
      id: '10',
      countryname: 'Nipal',
    },
    {
      id: '11',
      countryname: 'India',
    },
  ];

  const firestore_ref = firestore().collection('Users')

  // const restriction=()=>{
  //   if(password !== confirmPassword){
  //     alert("Plz enter same passowrd")
  //     return;
  //   }
  //   if(firstName===''){
  //     alert("Plz enter first name first")
  //     return;
  //   }
  //   if(sureName===''){
  //     alert("Plz enter sureName first")
  //     return;
  //   }
  //   if(password===''){
  //     alert("Plz enter password first")
  //     return;
  //   }
  //   if(confirmPassword===''){
  //     alert("Plz enter confirmPassword first")
  //     return;
  //   }

  //   if(city===''){
  //     alert("Plz enter city first")
  //     return;
  //   }


  //   if(address===''){
  //     alert("Plz enter address first")
  //     return;
  //   }
  // }




  async function RegisterUser() {
    //  restriction()

    if (password !== confirmPassword) {
      alert("Plz enter same passowrd")
      return;
    }
    if (firstName === '') {
      setvalidatefirstname(true)
      return;

    }
    // if (sureName === '') {
    //   setvalidatesurename(true)
    //   return;

    // }

    if (email === '') {
      setvalidateemail(true)
      return;
    }


    if (password === '') {
      setvalidatepassword(true)
      return;
    }
    if (confirmPassword === '') {
      setvalidaeconfirmpassword(true)
      return;
    }

    // if (city === '') {
    //   setvalidatecity(true)
    //   return;
    // }


    // if (address === '') {

    //   setvalidateaddress(true)
    //   return;
    // }



    setloader(true)

  //  var uniq = 'id-' + (new Date()).getTime();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then((loggeduser) => {
     //    const userdata=firestore_ref.doc(loggeduser.user.uid)
     const userdata=firestore_ref.doc(email)
      //  const userdata = firestore_ref.doc(uniq)
        userdata.set({
          name: firstName,
          sureName: sureName,
          email: email,
          phonenumber: mobile,
          country: country,
          city: city,
          address: address,
          id: email, 
        }).then(() => {
          empty();
          navigation.navigate('Signin')
          setloader(false)

        })
      })
      .catch((error) => {
        setloader(false)
        alert(error)
        console.log("Signup Error---->", error);


      })

  }


  const empty = () => {
    setfirstName('')
    setsureName('')
    setemail('')
    setpassword('')
    setmobile('')
    setcountry('')
    setcity('')
    setaddress('')
    setConfirmPassword('')
  }



  const renderfunction = ({ item }) => {
    console.log(item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => [
            setModalVisible(false),
            setcountry(item.countryname),
          ]}>
          <View
            style={{
              height: hp(7),
              flexDirection: 'row',

              justifyContent: 'space-between',
              padding: 12,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: FontSize.font16, color: Colors.black }}>
              {item.countryname}
            </Text>
            <Entypo name="circle" size={15} style={{ top: 5 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.Container}>
    <ScrollView>
      
        <View style={{ position: 'absolute', top: hp(3), left: wp(5) }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={Colors.purple}
            />
          </TouchableOpacity>
        </View>


        <View style={{ height: hp(7), top: hp(7) }}>
          <Text style={Styles.createaccountxt}>CREATE ACCOUNT</Text>
        </View>

        <View
          style={{
            height: hp(60),
            width: wp(85),
            alignSelf: 'center',
            top: hp(6),
          }}>



          <TextInput
            style={[
              Styles.textinpt,
              {
                borderBottomColor: Colors.purple,
              },
            ]}
            placeholder="First Name"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setfirstName(value), setvalidatefirstname(false) }}
            value={firstName}
          />
          {validatefirstname ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  First Name Require!
            </Text>
            :
            null
          }
          <TextInput
            style={[
              Styles.textinpt,
              {
                borderBottomColor: Colors.purple,
              },
            ]}
            placeholder="Sure Name"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setsureName(value), setvalidatesurename(false) }}
            value={sureName}
          />

          {validatesurename ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Sure Name Require!
            </Text>
            :
            null
          }

          <TextInput
            style={Styles.textinpt}
            placeholder="Email"
            keyboardType='email-address'
            autoCapitalize='none'
            // autoCorrect={'false'}
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setemail(value), setvalidateemail(false) }}
            value={email}
          />
          {validateemail ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Email Require!
            </Text>
            :
            null
          }

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FAFAFA',
              borderBottomWidth: 1,
              height: hp(6.5),
              margin: 3,
            }}>
            <TextInput
              style={{
                width: wp(75),
                fontSize: FontSize.font14,
                color: Colors.dark,
                padding: 10,
                paddingLeft: 14,
                alignItems: 'center',

              }}
              onChangeText={e => { setpassword(e), setvalidatepassword(false) }}
              placeholder="Password"
              placeholderTextColor={Colors.dark}
              secureTextEntry={passwordIcon}
              value={password}
            />

            {passwordIcon ? (
              <TouchableOpacity
                onPress={() => setPasswordIcon(false)}
                style={Styles.passwordentypo}>
                <Entypo name={'eye'} size={20} color={'#AAAAAA'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.passwordentypo}
                onPress={() => setPasswordIcon(true)}>
                <Entypo name="eye-with-line" size={20} color={'#AAAAAA'} />
              </TouchableOpacity>
            )}
          </View>
          {validatepassword ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Password Require!
            </Text>
            :
            null
          }
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FAFAFA',
              borderBottomWidth: 1,
              height: hp(6.5),
              margin: 3,
            }}>
            <TextInput
              style={{
                width: wp(75),
                fontSize: FontSize.font14,
                color: Colors.dark,
                padding: 10,
                paddingLeft: 14,
                alignItems: 'center',
              }}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.dark}
              secureTextEntry={confirmPasswordIcon}
              onChangeText={value => { setConfirmPassword(value), setvalidaeconfirmpassword(false) }}
              value={confirmPassword}
            />

            {confirmPasswordIcon ? (
              <TouchableOpacity
                onPress={() => setConfirmPasswordIcon(false)}
                style={Styles.passwordentypo}>
                <Entypo name={'eye'} size={20} color={'#AAAAAA'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setConfirmPasswordIcon(true)}
                style={Styles.passwordentypo}>
                <Entypo name="eye-with-line" size={20} color={'#AAAAAA'} />
              </TouchableOpacity>
            )}
          </View>
          {validaeconfirmpassword ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Confirm Password Require!
            </Text>
            :
            null
          }
          <TextInput
            style={Styles.textinpt}
            placeholder="Mobile Number"
            keyboardType="numeric"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setmobile(value), setvalidatemobile(false) }}
            value={mobile}

          />

          {validatefirstname ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  Mobile Number Require!
            </Text>
            :
            null
          }

          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingTop: 20 }}>
              <Warn height={'16.58px'} width={'16.58px'} />
            </View>
            <Text style={{ padding: 10, color: Colors.black }}>
              create a password that containing alphanumeric and special
              characters
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={Styles.countrtview}>
              <Text style={{ fontSize: FontSize.font14, color: Colors.dark }}>
                {country}
              </Text>

              <MaterialIcons name="arrow-drop-down" size={30} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={Styles.textinpt}
            placeholder="City"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setcity(value), setvalidatecity(false) }}
            value={city}
          />
          {validatecity ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  City  Require!
            </Text>
            :
            null
          }

          <TextInput
            style={Styles.textinpt}
            placeholder="Address"
            placeholderTextColor={Colors.dark}
            onChangeText={value => { setaddress(value), setvalidateaddress(false) }}
            value={address}
          />
          {validateaddress ?
            <Text style={{ fontSize: FontSize.font13, color: Colors.red }}> Address Require!
            </Text>
            :
            null
          }

          <TouchableOpacity
            onPress={() => RegisterUser()}
            style={{
              height: 44,
              width: 177,
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: Colors.purple,
              borderRadius: 10,
              top: hp(5),
            }}>
            {loader ?
              <ActivityIndicator size={'small'} color={Colors.White} style={{ justifyContent: "center", alignSelf: "center", flex: 1, alignContent: "center" }} />
              :


              <Text
                style={{
                  color: Colors.White,
                  textAlign: 'center',
                  fontSize: FontSize.font18,
                }}>
                CONTINUE
              </Text>
            }
          </TouchableOpacity>
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
              width: wp(83),
              alignSelf: 'center',
              top: hp(13),
              height: hp(73),
            }}>
            <FlatList
              data={Countries}
              renderItem={renderfunction}
              keyExtractor={item => item.id}
            />

          </View>
        </Modal>

        </ScrollView>

      </SafeAreaView>



   
  );
}



// {loader ?
//   <ActivityIndicator size={'large'} color={Colors.purple} style={{ justifyContent: "center",alignSelf: "center", alignContent: "center" }} />
//   :
//   null
// }