import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableHighlight
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import apiKey from "../google_api_key";
import PolyLine from "@mapbox/polyline";

export default class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      destination: "",
      predictions: [],
      pointCoords: []
    };
  }

  componentDidMount() {
    //Get current location and set initial region to this
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );
  }

  render() {
    let marker = null;

    if (this.state.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
        />
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={this.state.pointCoords}
            strokeWidth={4}
            strokeColor="red"
          />
          {marker}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  findDriver: {
    backgroundColor: "black",
    marginTop: "auto",
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center"
  },
  findDriverText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600"
  },
  suggestions: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5
  },
  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: "white"
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
