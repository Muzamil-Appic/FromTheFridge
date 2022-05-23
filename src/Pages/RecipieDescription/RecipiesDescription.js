// import { ToastAndroid, Share, View, Text, TouchableOpacity, TouchableHighlight, Image, FlatList, ActivityIndicator, ScrollView, Dimensions, TouchableHighlightBase, } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
// import Colors from '../../Global/Colors';
// import FontSize from '../../Global/FontSizes';
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import MarkSvg from '../../Assets/Icons/MarkSvg.svg'
// import ForwardSvg from '../../Assets/Icons/ForwardSvg.svg'
// import { useIsFocused } from '@react-navigation/native';
// import Favor from '../../Assets/Icons/Favor'
// import Shre from '../../Assets/Icons/Shre.svg'
// import HTMLView from 'react-native-htmlview';
// import ActivityLoader from '../../Components/ActivityLoader';
// import firestore, { firebase } from '@react-native-firebase/firestore'
// import Fontisto from 'react-native-vector-icons/Fontisto'


// export default function RecipiesDescription({ navigation, route }) {


//     const loginpersonid = firebase.auth().currentUser.uid
//     const firebaseobect = firestore().collection('Favourite')
//     const isFocused = useIsFocused();
//     const siz = Dimensions.get('window').height;
//     //  console.log("yh data lay kr ay ahoon main back sahy", route?.params);
//     const id = route?.params?.id;
//     const img = route?.params?.image
//     const titles = route?.params?.title
//     const [data, setDaat] = useState([]);
//     const [splitin, setspliting] = useState('')
//     const [loader, setloader] = useState(false)
//     const [recipies, setrecipies] = useState(true)
//     const [similier, setsimilier] = useState([])
//     const [fiverisTrue, setFiverisTrue] = useState(false)



//     const checkfevert = async () => {
//         const emails = await firebase.auth().currentUser.email;
//         const uniq = emails + route?.params?.id;
//         console.log("====================================");
//         console.log(route?.params?.id);
//         console.log("====================================");
//         await firestore()
//           .collection("Favourite")
//           .doc(uniq)
//           .get()
//           .then((e) => {
//             console.log(14646, e.data());
//             setFavirt(e.exists);
//           });
//       };



//     useEffect(() => {
//         //  getclicking()
//         ApiResponse()
//         similerrecipies()
//         getrecipieingredients()
//     }, [isFocused])


//     const sharefunction = async () => {
//         try {
//             const result = await Share.share({
//                 message:
//                     'From The Fridge App,this portion is in working',
//             });
//             if (result.action === Share.sharedAction) {
//                 if (result.activityType) {
//                     // shared with activity type of result.activityType
//                 } else {
//                     // shared
//                 }
//             } else if (result.action === Share.dismissedAction) {
//                 // dismissed
//             }
//         } catch (error) {
//             alert(error.message);
//         }
//     };









//     const ApiResponse = async () => {
//         // setloader(true)
//         // const emails = firebase.auth().currentUser.email
//         // const koi = emails + id;
//         // console.log(id);
//         // console.log('====================================');
//         // console.log(koi);
//         // console.log('====================================');
//         // let kk = ''




//         await firestore().collection('Favourite').doc(koi).get().then(e => {
//             if (e.koi == koi) {
//                 console.log(e.id);
//                 console.log("OKOKOKOKOKOKOO");
//                 kk = false

//             } else {
//                 console.log("NONONOONONO");
//                 kk = true
//             }
//             setFiverisTrue(kk)
//         })

//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Host':
//                     'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
//                 'X-RapidAPI-Key': '1d12012fc9msh21199db8ef72d70p1d0f8ajsnbbf3d57a2632',
//             },
//         };
//         await fetch(
//             `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
//             options,
//         )
//             .then(response => response.json())
//             .then(response => {
//                 //  console.log(response);
//                 setDaat(response);
//             })
//             .catch(err => console.error(err));
//         // .then(response => console.log("Singel Recipe response",response))

//         setloader(false)
//         checkfevert();
//     };


//     const delFun = () => {
//         const emails = firebase.auth().currentUser.email
//         const uniq = emails + data.id;
//         firestore().collection('Favourite').doc(uniq).delete()
//         setFiverisTrue(true)
//        // ToastAndroid.show(" UN LIKE DONE", ToastAndroid.SHORT);
//     }
//     const DoFavourite = async () => {
//         const emails = firebase.auth().currentUser.email
//         const uniq = emails + data?.id;
//         setFiverisTrue(false)
//         const userfavourites = firebaseobect.doc(uniq)
//         userfavourites.set({
//             firbaseid: uniq,
//             image: data.image,
//             title: data?.title,
//             id: data?.id,
//             loginpersonid: loginpersonid,
//         }).then(() => {
//             // console.log("Favourite");
//          //   ToastAndroid.show(" Favourite DONE", ToastAndroid.SHORT);
//         })
//             .catch((error) => {
//                 alert(error)
//                 console.log("Error---->", error);
//             })

//     }



//     const similerrecipies = async () => {
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Host':
//                     'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
//                 'X-RapidAPI-Key': '1d12012fc9msh21199db8ef72d70p1d0f8ajsnbbf3d57a2632',
//             },
//         };
//         fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/similar`, options).then(response => response.json())
//             .then(response => {
//                 //     console.log("similer Recipies----->", response);
//                 setsimilier(response);
//             })
//             .catch(err => console.error(err));
//         // .then(response => console.log("Singel Recipe response",response))


//     };

//     const getrecipieingredients = () => {
//         setloader(true)
//         console.log('Ok1');
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Host':
//                     'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
//                 'X-RapidAPI-Key': '1d12012fc9msh21199db8ef72d70p1d0f8ajsnbbf3d57a2632',
//             },
//         };
//         fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/ingredientWidget.json`, options)

//             .then(response => response.json())
//             .then(response => {
//                 // console.log("Recipies ingredients------->", response);
//                 // setDaat(response);
//             })
//             .catch(err => console.error(err));
//         // .then(response => console.log("Singel Recipe response",response))

//         setloader(false)

//     };


//     const enebledrealetsdat = () => {
//         setrecipies(false);
//     }

//     const enablesdata = () => {
//         setrecipies(true);
//     }




//     const renderfunction = ({ item }) => {
//         //  console.log(item);
//         return (
//             <View >
//                 <View style={{ elevation: 2, backgroundColor: Colors.White, width: rw(96), height: rh(6), borderRadius: 10, flexDirection: 'row', marginTop: rh(2), alignItems: "center", justifyContent: "space-between" }}>
//                     <Text style={{ width: rw(70), fontSize: FontSize.fon15, color: Colors.black, fontWeight: '700', paddingLeft: rw(2) }} numberOfLines={1}>{item.title}</Text>
//                     <TouchableOpacity onPress={() => navigation.replace('RecipiesDescription', item)} style={{ paddingRight: rw(2) }}>
//                         <ForwardSvg height={'25px'} width={'25px'} />
//                     </TouchableOpacity>
//                 </View>

//             </View>
//         )

//     }


//     return (
//         <View style={{ flex: 1 }}>
//             <View style={{ height: rh(20), backgroundColor: '#8B008B70', justifyContent: 'center', alignItems: 'center' }}>
//                 {loader ?
//                     <ActivityLoader />
//                     :
//                     <Image source={{ uri: data.image }} style={{ resizeMode: 'stretch', height: rh(20), width: rw(30) }} />
//                 }
//             </View>


//             <View style={{ flexDirection: "row", justifyContent: 'space-between', backgroundColor: Colors.purple, borderBottomColor: '#BC03BC', height: rh(7), alignItems: 'center', borderWidth: 1, alignContent: 'center' }}>
//                 <TouchableOpacity
//                     style={{ left: rw(3) }}
//                     onPress={() => navigation.goBack()}>
//                     <Ionicons name="chevron-back" size={30} color={Colors.White} />
//                 </TouchableOpacity>
//                 <Text style={{ color: Colors.White, width: rw(60), fontSize: FontSize.font19, textAlign: 'center' }} numberOfLines={1}>{data?.title}</Text>
//                 <View style={{ right: rw(3), flexDirection: 'row', width: rw(13), justifyContent: 'space-between' }}>

//                     {fiverisTrue ?


//                         <TouchableHighlight onPress={() => DoFavourite()}>
//                             <Fontisto size={20} name={'favorite'} color={Colors.dark} />
//                         </TouchableHighlight>


//                         :
//                         <TouchableHighlight onPress={() => delFun()}>
//                             <Fontisto size={20} name={'favorite'} color={Colors.White} />
//                         </TouchableHighlight>
//                     }





//                     <TouchableOpacity onPress={() => sharefunction()}>
//                         <Shre height={'20px'} width={'18px'} />
//                     </TouchableOpacity>
//                 </View>
//             </View>




//             {recipies ?

//                 <View style={{ height: rh(9), backgroundColor: Colors.purple, justifyContent: 'center', flexDirection: "row", alignContent: 'center', alignItems: 'center' }}>
//                     <TouchableOpacity style={{ left: 5, height: rh(5), width: rw(30), justifyContent: 'center', alignItems: "center", borderRadius: 20, borderColor: Colors.White, borderWidth: 1 }}>
//                         <Text style={{ color: Colors.White }}>Recipe</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => enebledrealetsdat()} style={{ left: 5, height: rh(5), width: rw(30), justifyContent: 'center', alignItems: "center", borderRadius: 20, }}>
//                         <Text style={{ color: Colors.White }}>Related Recipe</Text>
//                     </TouchableOpacity>
//                 </View>

//                 :
//                 <View style={{ height: rh(9), backgroundColor: Colors.purple, justifyContent: 'center', flexDirection: "row", alignContent: 'center', alignItems: 'center' }}>
//                     <TouchableOpacity onPress={() => enablesdata()} style={{ height: rh(5), width: rw(25), justifyContent: 'center', alignItems: "center", }}>
//                         <Text style={{ color: Colors.White }}>Recipe</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={{ left: 5, height: rh(5), width: rw(30), justifyContent: 'center', alignItems: "center", borderRadius: 20, borderColor: Colors.White, borderWidth: 1 }}>
//                         <Text style={{ color: Colors.White }}>Related Recipe</Text>
//                     </TouchableOpacity>
//                 </View>

//             }



//             {recipies ?

//                 <View style={{ marginHorizontal: rh(1), borderWidth: 1, borderColor: Colors.purple, marginTop: rh(1), flex: 1 }}>


//                     {loader ?

//                         <ActivityLoader />
//                         :
//                         <ScrollView showsVerticalScrollIndicator={false} >



//                             <View style={{ padding: 10, borderBottomWidth: 1, borderColor: Colors.purple }}>
//                                 <Text style={{ color: Colors.black, fontSize: FontSize.font18, fontWeight: '700' }}>Details</Text>
//                                 <View style={{ flexDirection: 'row', width: rw(90), justifyContent: 'space-around' }}>
//                                     <View style={{ flexDirection: 'row' }}>
//                                         <Text style={{ fontWeight: "700", color: Colors.black, fontSize: FontSize.font16 }} >Cooking Time</Text>
//                                         <Text style={{ color: Colors.black, fontSize: FontSize.font16, left: rw(5) }} >{data.readyInMinutes}</Text>
//                                     </View>
//                                     <View style={{ flexDirection: 'row' }}>
//                                         <Text style={{ fontWeight: "700", color: Colors.black, fontSize: FontSize.font16 }} >Serving Size</Text>
//                                         <Text style={{ color: Colors.black, fontSize: FontSize.font16, left: rw(5) }} >{data.servings}</Text>
//                                     </View>
//                                 </View>

//                             </View>

//                             <View style={{ padding: 10, borderBottomWidth: 1, borderColor: Colors.purple }}>
//                                 <Text style={{ color: Colors.black, fontSize: FontSize.font18, fontWeight: '700' }}>Summary</Text>




//                                 <HTMLView stylesheet={{ flexDirection: 'row', fontSize: FontSize.font20 }}
//                                     value={'<P>' + data.summary + '</P>'}

//                                 />


//                             </View>
//                             <View style={{ padding: 10, borderColor: Colors.purple }}>
//                                 <Text style={{ color: Colors.black, fontSize: FontSize.font18, fontWeight: '700' }}>Directions</Text>

//                                 <Text style={{ color: Colors.black, width: rw(90) }} > {data.instructions}</Text>
//                             </View>

//                         </ScrollView>
//                     }
//                 </View>



//                 :
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
//                     <FlatList data={similier}
//                         renderItem={renderfunction}
//                         keyExtractor={item => item.id}
//                         // numColumns={2}
//                         showsVerticalScrollIndicator={false}
//                         contentContainerStyle={{ alignSelf: "center", paddingBottom: rh(4), }}
//                     // contentContainerStyle={{ flexDirection: 'row' }}
//                     />

//                 </View>
//             }






//         </View >

//     )
// }


import {
    Share,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
    responsiveHeight as rh,
    responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import Colors from "../../Global/Colors";
import FontSize from "../../Global/FontSizes";
import Ionicons from "react-native-vector-icons/Ionicons";
import MarkSvg from "../../Assets/Icons/MarkSvg.svg";
import ForwardSvg from "../../Assets/Icons/ForwardSvg.svg";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Favor from "../../Assets/Icons/Favor";
import Shre from "../../Assets/Icons/Shre.svg";
import HTMLView from "react-native-htmlview";
import ActivityLoader from "../../Components/ActivityLoader";
import firestore, { firebase } from "@react-native-firebase/firestore";
import Fontisto from 'react-native-vector-icons/Fontisto'
export default function RecipiesDescription({ navigation, route }) {
    const loginpersonid = firebase.auth().currentUser.email;
    const firebaseobect = firestore().collection("Favourite");
    const isFocused = useIsFocused();
    const siz = Dimensions.get("window").height;
    const id = route?.params?.id;
    const img = route?.params?.image;
    const titles = route?.params?.title;
    const [data, setDaat] = useState([]);
    const [splitin, setspliting] = useState("");
    const [loader, setloader] = useState(false);
    const [recipies, setrecipies] = useState(true);
    const [favirt, setFavirt] = useState(false);


    const [similier, setsimilier] = useState([]);

    const sharefunction = async () => {
        try {
            const result = await Share.share({
                message: "From The Fridge App,this portion is in working",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const renderfunction = ({ item }) => {
        console.log(item);
        return (
            <View>
                <View
                    style={{
                        elevation: 2,
                        backgroundColor: Colors.White,
                        width: rw(96),
                        height: rh(6),
                        borderRadius: 10,
                        flexDirection: "row",
                        marginTop: rh(2),
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            width: rw(70),
                            fontSize: FontSize.fon15,
                            color: Colors.black,
                            fontWeight: "700",
                            paddingLeft: rw(2),
                        }}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.replace("RecipiesDescription", item)}
                        style={{ paddingRight: rw(2) }}
                    >
                        <ForwardSvg height={"25px"} width={"25px"} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    useEffect(() => {
        ApiResponse();
        similerrecipies();
        getrecipieingredients();
    }, [isFocused]);
    const checkfevert = async () => {
        const emails = await firebase.auth().currentUser.email;
        const uniq = emails + route?.params?.id;
        console.log("====================================");
        console.log(route?.params?.id);
        console.log("====================================");
        await firestore()
            .collection("Favourite")
            .doc(uniq)
            .get()
            .then((e) => {
                console.log(14646, e.data());
                setFavirt(e.exists);
            });
    };
    const ApiResponse = async () => {
        setloader(true);
        console.log("Ok1");
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Host":
                    "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "1d12012fc9msh21199db8ef72d70p1d0f8ajsnbbf3d57a2632",
            },
        };
        await fetch(
            `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                  console.log("recippppppppp",response);
                setDaat(response);
            })
            .catch((err) => console.error(err));
        // .then(response => console.log("Singel Recipe response",response))

        setloader(false);
        checkfevert();
    };

    const DoFavourite = () => {
        const emails = firebase.auth().currentUser.email;
        const uniq = emails + data.id;
        console.log("====================================");
        console.log(uniq);
        console.log("====================================");

        const userfavourites = firebaseobect.doc(uniq);
        userfavourites
            .set({
                firbaseid: uniq,
                image: data.image,
                title: data?.title,
                id: data?.id,
                loginpersonid: loginpersonid,
            })
            .then(() => {
                setFavirt(true);
                // console.log("Favourite");
            })
            .catch((error) => {
                alert(error);
                console.log("Error---->", error);
            });
    };

    const DoUnlike = () => {
        const emails = firebase.auth().currentUser.email;
        const uniq = emails + data.id;

        firestore().collection("Favourite").doc(uniq).delete();
        setFavirt(false);
    };
    const similerrecipies = () => {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Host":
                    "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "1d12012fc9msh21199db8ef72d70p1d0f8ajsnbbf3d57a2632",
            },
        };
        fetch(
            `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/similar`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                //     console.log("similer Recipies----->", response);
                setsimilier(response);
            })
            .catch((err) => console.error(err));
        // .then(response => console.log("Singel Recipe response",response))
    };

    const getrecipieingredients = () => {
        setloader(true);
        console.log("Ok1");
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Host":
                    "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "1d12012fc9msh21199db8ef72d70p1d0f8ajsnbbf3d57a2632",
            },
        };
        fetch(
            `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/ingredientWidget.json`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                 console.log("Recipies ingredients------->", response);
                // setDaat(response);
            })
            .catch((err) => console.error(err));
        // .then(response => console.log("Singel Recipe response",response))

        setloader(false);
    };

    const enebledrealetsdat = () => {
        setrecipies(false);
    };

    const enablesdata = () => {
        setrecipies(true);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    height: rh(20),
                    backgroundColor: "#8B008B70",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {loader ? (
                    <ActivityLoader />
                ) : (
                    <Image
                        source={{ uri: data.image }}
                        style={{ resizeMode: "stretch", height: rh(20), width: rw(30) }}
                    />
                )}
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: Colors.purple,
                    borderBottomColor: "#BC03BC",
                    height: rh(7),
                    alignItems: "center",
                    borderWidth: 1,
                    alignContent: "center",
                }}
            >
                <TouchableOpacity
                    style={{ left: rw(3) }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text
                    style={{
                        color: Colors.White,
                        width: rw(60),
                        fontSize: FontSize.font19,
                        textAlign: "center",
                    }}
                    numberOfLines={1}
                >
                    {data?.title}
                </Text>
                <View
                    style={{
                        right: rw(3),
                        flexDirection: "row",
                        width: rw(13),
                        justifyContent: "space-between",
                    }}
                >
                    {favirt ? (
                        <TouchableOpacity onPress={() => DoUnlike()}>
                            <Fontisto size={20} name={'favorite'} color={Colors.White} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => DoFavourite()}>
                            <Fontisto size={20} name={'favorite'} color={Colors.dark} />
                        </TouchableOpacity>
                    )}










                    <TouchableOpacity onPress={() => sharefunction()}>
                        <Shre height={"20px"} width={"18px"} />
                    </TouchableOpacity>
                </View>
            </View>

            {recipies ? (
                <View
                    style={{
                        height: rh(9),
                        backgroundColor: Colors.purple,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            left: 5,
                            height: rh(5),
                            width: rw(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                            borderColor: Colors.White,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={{ color: Colors.White }}>Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => enebledrealetsdat()}
                        style={{
                            left: 5,
                            height: rh(5),
                            width: rw(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                    >
                        <Text style={{ color: Colors.White }}>Related Recipe</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View
                    style={{
                        height: rh(9),
                        backgroundColor: Colors.purple,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => enablesdata()}
                        style={{
                            height: rh(5),
                            width: rw(25),
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: Colors.White }}>Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            left: 5,
                            height: rh(5),
                            width: rw(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                            borderColor: Colors.White,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={{ color: Colors.White }}>Related Recipe</Text>
                    </TouchableOpacity>
                </View>
            )}

            {recipies ? (
                <View
                    style={{
                        marginHorizontal: rh(1),
                        borderWidth: 1,
                        borderColor: Colors.purple,
                        marginTop: rh(1),
                        flex: 1,
                    }}
                >
                    {loader ? (
                        <ActivityLoader />
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View
                                style={{
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderColor: Colors.purple,
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.black,
                                        fontSize: FontSize.font18,
                                        fontWeight: "700",
                                    }}
                                >
                                    Details
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: rw(90),
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                color: Colors.black,
                                                fontSize: FontSize.font16,
                                            }}
                                        >
                                            Cooking Time
                                        </Text>
                                        <Text
                                            style={{
                                                color: Colors.black,
                                                fontSize: FontSize.font16,
                                                left: rw(5),
                                            }}
                                        >
                                            {data.readyInMinutes}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                color: Colors.black,
                                                fontSize: FontSize.font16,
                                            }}
                                        >
                                            Serving Size
                                        </Text>
                                        <Text
                                            style={{
                                                color: Colors.black,
                                                fontSize: FontSize.font16,
                                                left: rw(5),
                                            }}
                                        >
                                            {data.servings}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderColor: Colors.purple,
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.black,
                                        fontSize: FontSize.font18,
                                        fontWeight: "700",
                                    }}
                                >
                                    Summary
                                </Text>



                                <HTMLView
                                    stylesheet={{
                                        flexDirection: "row",
                                        fontSize: FontSize.font20,
                                    }}
                                    value={"<P>" + data.summary + "</P>"}
                                />
                            </View>
                            <View style={{ padding: 10, borderColor: Colors.purple }}>
                                <Text
                                    style={{
                                        color: Colors.black,
                                        fontSize: FontSize.font18,
                                        fontWeight: "700",
                                    }}
                                >
                                    Directions
                                </Text>




                                <Text style={{ color: Colors.black, width: rw(90) }}>
                                    {" "}
                                    {data.instructions}
                                </Text>
                            </View>
                        </ScrollView>
                    )}
                </View>
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <FlatList
                        data={similier}
                        renderItem={renderfunction}
                        keyExtractor={(item) => item.id}
                        // numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignSelf: "center",
                            paddingBottom: rh(4),
                        }}
                    // contentContainerStyle={{ flexDirection: 'row' }}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}