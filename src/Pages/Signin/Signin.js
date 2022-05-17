import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//Global
import Styles from './Signin.Styles';
import Colors from '../../Global/Colors';
import FontSize from '../../Global/FontSizes';
import ActivityLoader from '../../Components/ActivityLoader'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '324447483484-7g1ue1gd2eeqb6te3e57sqied9edc33k.apps.googleusercontent.com',
});

//firebase
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


//SVG
import FaceBook from '../../Assets/Icons/FaceBook.svg';
import Google from '../../Assets/Icons/Google';
import Linesvg from '../../Assets/Icons/Linesvg';
export default function Signin({ navigation }) {
  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setloader] = useState(false)
  const [userdata, setuserdata] = useState([])


  //validates staes
  const [validateemail, setvalidateemail] = useState(false)
  const [validatepassword, setvalidatepassword] = useState(false)
  const [googleloader, setgoogleloader] = useState(false)
  const firestore_ref = firestore().collection('Users')


  const empty = () => {
    setEmail('')
    setPassword('')
  }



  useEffect(() => {
    asun()
  }, [])


  const asun = async () => {
    await AsyncStorage.getItem('userdetails').then(async value => {
      let data = JSON.parse(value);
      let useremail = data?.id
      console.log("------00000>", useremail);
      if (useremail) {
        navigation.replace('TabNavigations')
      }
      else {
        console.log("YH wala chal rha hay hay na");
        navigation.navigate('Signin')
      }

    })


  }






  async function onGoogleButtonPress() {
    // Get the users ID token
    setgoogleloader(true)
    await GoogleSignin.hasPlayServices();
    const userinfo = await GoogleSignin.signIn();
    console.log("------->user infooooo909090", userinfo)
    const googleCredential = auth.GoogleAuthProvider.credential(userinfo.idToken);
    console.log("googlecredential9090909", googleCredential)
    const loggeduser = auth().signInWithCredential(googleCredential)
      ///   console.log(userinfo)
      // Sign-in the user with the credential
      .then((loggeduser) => {
        console.log(loggeduser);
        console.log("io909090", loggeduser);
        console.log("io909090", loggeduser.user.email);
        //   console.log(loggeduser.additionalUserInfo.profile.given_name);
        const userdata = firestore_ref.doc(loggeduser.user.email)
        userdata.set({
          email: loggeduser.user.email,
          id: loggeduser.user.email,
          name: loggeduser.additionalUserInfo.profile.given_name,
          // phonenumber: '',
          // country: '',
          // city: '',
          // address: '',
        }, { merge: true }).then(
          AsyncStorage.setItem(
            'userdetails',
            JSON.stringify({
              email: loggeduser.user.email,
              id: loggeduser.user.email,
            })
          )
        )

      }).then(() => {
        empty();
        navigation.replace('TabNavigations')
        setgoogleloader(false)
      })
      .catch((error) => {
        setgoogleloader(false)
        alert(error)
        console.log("Error---->", error);
      })
  }




  // const onGoogleButtonPress = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn().then(setuserdata(userInfo))

  //     console.log("------>",userInfo.user.email);
  //  //   setloader(true)
  //     await firebase
  //       .auth()
  //       .signInWithCredential(userInfo.user.email)
  //       .then((user) => {
  //         console.log(user);
  //         empty()
  //      //   setloader(false)
  //     //    navigation.replace('TabNavigations')

  //       })



  //     console.log("---->User INfo", userInfo);
  //   } catch (error) {
  //     console.log(error);
  // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //   // user cancelled the login flow
  // } else if (error.code === statusCodes.IN_PROGRESS) {
  //   // operation (e.g. sign in) is in progress already
  // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //   // play services not available or outdated
  // } else {
  //   // some other error happened
  // }
  //   }
  // };


  async function LoginUser() {

    if (email === '') {
      setvalidateemail(true)
      return;
    }
    if (password === '') {
      setvalidatepassword(true)
      return;
    }

    setloader(true)
    await firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((user) => {
        console.log("user login information----->", user.user.email)
          AsyncStorage.setItem(
            'userdetails',
            JSON.stringify({
              email:  user.user.email,
              id:  user.user.email,
            })
          )
        
        empty()
        setloader(false)
        navigation.replace('TabNavigations')
        console.log("DONE dona DOne");
      }



      )
      .catch((error) => {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        setEmail('')
        setPassword('')
        setloader(false)
        alert(error.code)
      })



  }


  return (
    <SafeAreaView style={Styles.Container}>
      <View style={Styles.aptext}>
        <Text style={Styles.fromtheFridgetext}>FromTheFridge</Text>
        <Text style={Styles.whatinfridge}>What’s in your fridge?</Text>
      </View>
      <View style={Styles.textviewstyle}>
        <TextInput
          onChangeText={e => { setEmail(e), setvalidateemail(false) }}
          style={Styles.textinputstyle}
          placeholder={'Email'}
          placeholderTextColor={Colors.dark}
          value={email}
          keyboardType='email-address'
        />
        {validateemail ?
          <Text style={{ fontSize: FontSize.font13, color: Colors.red }}>  email Require!
          </Text>
          :
          null
        }
        <TextInput
          onChangeText={e => { setPassword(e), setvalidatepassword(false) }}
          style={Styles.textinputstyle}
          placeholder={'Password'}
          placeholderTextColor={Colors.dark}
          value={password}
          secureTextEntry={true}
        />

        {validatepassword ?
          <Text style={{ fontSize: FontSize.font13, color: Colors.red, justifyContent: 'flex-start', textAlign: "left" }}>  Password Require!
          </Text>
          :
          null
        }

        <TouchableOpacity
          onPress={() => LoginUser()}
          style={Styles.loginbutton}

        >

          {loader ?
            <ActivityIndicator size={'small'} color={Colors.White} style={{ justifyContent: "center", alignSelf: "center", flex: 1, alignContent: "center" }} />
            :
            <Text style={Styles.logintext}>GET STARTED</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: '#8B008BB0', fontSize: 21 }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: hp(5),
          width: wp(45),
          marginVertical: hp(9.5),
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Linesvg height={'24px'} width={'30px'} />
        <Text style={{ color: '#606060', fontSize: FontSize.font13 }}>
          Or login With
        </Text>
        <Linesvg height={'24px'} width={'30px'} />
      </View>
      <View style={[Styles.svgmainstyle]}>
        <View style={Styles.svgstyle}>
          <FaceBook height={'24px'} width={'24px'} />
          <Text style={Styles.fbgoogletext}>Facebook</Text>
        </View>

        {googleloader ?
          <ActivityLoader />
          :
          <TouchableOpacity style={Styles.svgstyle}
            onPress={() => onGoogleButtonPress()}
          >
            <Google height={'24px'} width={'24px'} />
            <Text style={Styles.fbgoogletext}>Google</Text>
          </TouchableOpacity>
        }
      </View>



      {/* <TouchableOpacity style={Styles.svgstyle}
        onPress={() => onGoogleButtonPress()}
      >
        <Google height={'24px'} width={'24px'} />
        <Text style={Styles.fbgoogletext}>Google</Text>
      </TouchableOpacity> */}

      <View style={{ height: hp(10), top: hp(8), left: wp(5) }}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: Colors.purple, fontSize: FontSize.font22 }}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>





      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={googleloader}
        onRequestClose={() => {
          setgoogleloader(!googleloader);
        }}>
        <View style={{ flex: 1, justifyContent: "center",  }}>
          <ActivityLoader />
        </View>
      </Modal> */}




    </SafeAreaView>
  );
}
