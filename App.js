/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


export default class App extends Component {
//, Longitud:
  state = {
    region: {
      latitude: 3.42158,
      longitude: -76.5205,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  render() {
    location = {
      longitude: -76.509620,
      latitude: 3.395037
    }
    return (
      <MapView
        style={styles.map}
        region={this.state.region}
      >
        <MapView.Marker  coordinate={location} />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }

});
