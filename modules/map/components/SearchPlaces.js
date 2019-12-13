import { Callout } from 'react-native-maps';
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from '../../../config/GoogleMaps';
export default class SearchPlaces extends Component {
    render(){
        return(
            <Callout>
                <View style={styles.calloutView} >
                    <GooglePlacesAutocomplete
                        placeholder='Enter Destination'
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={'default'}
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        getDefaultValue={() => ''}
                        query={{
                            key: PLACES_API_KEY,
                            language: 'en', // language of the results
                            //types: '(cities)' // default: 'geocode'
                        }}
                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            textInput: {
                                fontSize: 16,
                            },
                            predefinedPlacesDescription: {
                                color: 'white'
                            },
                        }}
                        currentLocation={false}
                    />
                </View>
            </Callout>
        );
    }
}



const styles=StyleSheet.create({
    calloutView: {
      //borderRadius: 10,
      width: "75%",
      marginLeft: "35%",
      marginRight: "20%",
      marginTop: "20%"
    },
});
