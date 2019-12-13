import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {StyleSheet, Dimensions} from 'react-native';
import SearchPlaces from '../components/SearchPlaces';

const mini = [{
    title: '3\nmin',
    coordinates: {
        latitude: 12.899844,
        longitude: 77.631634
    }
},
{
    title: '4\nmin',
    coordinates: {
        latitude: 12.902254,
        longitude: 77.629027
    }
}]

const sedan = [{
    title: '5\nmin',
    coordinates: {
        latitude: 12.905925,
        longitude: 77.632347
    }
},
{
    title: '6\nmin',
    coordinates: {
        latitude: 12.894442,
        longitude: 77.635421
    }
}]

const suv = [{
    title: '2\nmin',
    coordinates: {
        latitude: 12.899844,
        longitude: 77.631634
    }
},
{
    title: '7\nmin',
    coordinates: {
        latitude: 12.905925,
        longitude: 77.632347
    }
}]


export default class MyHomeScreen extends Component {



    constructor(props) {
        super(props);

        this.state = {
            initialRegion: {
                latitude: 12.899305,
                longitude: 77.634118,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            markers: mini
        }
    }    

    createNewRide(){
        ToastAndroid.show('Trip created successfully!', ToastAndroid.SHORT);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
            this.setState({ initialRegion: initialRegion })
        },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map}
                        initialRegion={this.state.initialRegion}
                        showsUserLocation={true}>
                        {!!this.state.initialRegion.latitude && !!this.state.initialRegion.longitude && <MapView.Marker
                            coordinate={{ "latitude": this.state.initialRegion.latitude, "longitude": this.state.initialRegion.longitude }}
                            title={"Your Location"}
                        />}
                        {this.state.markers.map((marker, index) => (
                            <Marker
                                key={index}
                                coordinate={marker.coordinates}
                                title={marker.title}
                            >
                                <View style={styles.pinView}>
                                    <Text style={styles.pinText}>{marker.title}</Text>
                                    <Image style={styles.pinImage} source={require('../assets/icons/sedan.png')}></Image>
                                </View>
                            </Marker>
                        ))}

                    </MapView>
                    <SearchPlaces />
                    
                </View>


                <View style={styles.tabsContainer}>
                    <View style={styles.tabContainer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.setState({ markers: mini })}>
                                <Text style={styles.minuteText}></Text>
                                <Image source={require('../assets/icons/mini.png')}></Image>
                                <Text style={styles.cabTypeText}>Mini</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.setState({ markers: sedan })}>
                                <Text style={styles.minuteText}></Text>
                                <Image source={require('../assets/icons/sedan.png')}></Image>
                                <Text style={styles.cabTypeText}>Sedan</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.setState({ markers: suv })}>
                                <Text style={styles.minuteText}></Text>
                                <Image source={require('../assets/icons/suv.png')}></Image>
                                <Text style={styles.cabTypeText}>SUV</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.rideContainer}>
                        <TouchableOpacity onPress={() => this.createNewRide()}><Text style={styles.cabTypeButton}>Ride Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        );
    }
}


const styles=StyleSheet.create({
    container:{
        flex: 1,
      },mapContainer: {
        flex: 4,
      },
      map: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      },
      tabsContainer: {
        flex: 1,
      },
      tabContainer: {
        flex: 1.5,
        flexDirection: 'row',
        margin: 1,
        backgroundColor: 'black',
      },
      buttonContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor :'black',
        borderWidth: 0.5,
        margin: 3,
        borderRadius: 150,
        backgroundColor: 'white',
      }, 
      rideContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor :'black',
        borderWidth: 1,
        backgroundColor: 'white',
      },
      cabTypeText: {
        color: 'black',
        fontSize: 10,
      },
      minuteText: {
        color: 'black',
        fontSize: 12
      },
      pinView: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: 'blue',
    },
    pinText: {
        flex:1,
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },
    pinImage: {
      flex:1,
    },
    calloutView: {
      //borderRadius: 10,
      width: "75%",
      marginLeft: "35%",
      marginRight: "20%",
      marginTop: "20%"
    },
});
