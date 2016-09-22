/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FilterDemo from './FilterDemo';

class react_native_filter_demo extends Component {
  render() {
    return (
        <FilterDemo></FilterDemo>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('react_native_filter_demo', () => react_native_filter_demo);
