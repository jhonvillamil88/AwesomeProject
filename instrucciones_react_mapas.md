## Install npm module

    npm install react-native-maps --save

## Top-Level build.gradle
### add `google()` and change classpath  `com.android.tools.build:gradle:3.0.1`


    // Top-level build file where you can add configuration options common to all sub-projects/modules.
    
    buildscript {
        repositories {
            jcenter()
            google()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:3.0.1'
    
            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
        }
    }
    
    allprojects {
        repositories {
            mavenLocal()
            jcenter()
            maven {
                // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
                url "$rootDir/../node_modules/react-native/android"
            }
        }
    }

## android/gradle/wrapper/gradle-wrapper.properties
### Change  `distributionUrl`

    distributionBase=GRADLE_USER_HOME
    distributionPath=wrapper/dists
    zipStoreBase=GRADLE_USER_HOME
    zipStorePath=wrapper/dists
    distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip

## /android/settings.gradle
### include `react-native-maps`

    rootProject.name = 'MapsExample'
    include ':react-native-maps'
    project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')
    
    include ':app'
    
## /android/app/build.gradle
###  Update `compileSdkVersion` and add `multiDexEnabled true` if you need
### Dependencies must be use same version


    android {
      compileSdkVersion 25
      buildToolsVersion "25.0.1"

     defaultConfig {
         applicationId "app_id"
         minSdkVersion 16
         multiDexEnabled true
         targetSdkVersion 22
         versionCode 1
         versionName "1.0"
         ndk {
             abiFilters "armeabi-v7a", "x86"
         }
    }

    dependencies {
    compile (project(':react-native-camera')){
        exclude group: 'com.google.android.gms'
    compile 'com.android.support:exifinterface:25.+'
    compile ('com.google.android.gms:play-services-vision:12.0.1') {
        force = true
    }}
    compile project(':react-native-vector-icons')
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile "com.android.support:appcompat-v7:24.0.0"
    compile "com.facebook.react:react-native:+"  // From node_modules
    compile (project(':react-native-maps')){
      exclude group: 'com.google.android.gms'
    }
     compile ("com.google.android.gms:play-services-base:12.0.1") {
        force = true;
    }
    compile ("com.google.android.gms:play-services-maps:12.0.1") {
        force = true;
    }
   
}
    
    
    
    

## /android/app/src/main/AndroidManifest.xml
###  Add `com.google.android.geo.API_KEY` key
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.mapsexample">
    
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    
        <application
          android:name=".MainApplication"
          android:label="@string/app_name"
          android:icon="@mipmap/ic_launcher"
          android:allowBackup="false"
          android:theme="@style/AppTheme">
          <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
          </activity>
           <meta-data
          android:name="com.google.android.geo.API_KEY"
          android:value="AIzaSyC1F5BFOEvWeBv67pvGWzjMCFItmi851yg"/>
          <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
        </application>
    
    </manifest>

## /android/app/src/main/java/com/mapsexample/MainApplication.java
### Add `import com.facebook.react.shell.MainReactPackage` and `new MapsPackage()`

    package com.mapsexample;
    
    import android.app.Application;
    
    import com.facebook.react.ReactApplication;
    import com.airbnb.android.react.maps.MapsPackage;
    import com.facebook.react.ReactNativeHost;
    import com.facebook.react.ReactPackage;
    import com.facebook.react.shell.MainReactPackage;
    import com.facebook.soloader.SoLoader;
    
    import java.util.Arrays;
    import java.util.List;
    
    public class MainApplication extends Application implements ReactApplication {
    
      private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }
    
        @Override
        protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
                new MapsPackage()
          );
        }
    
        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };
    
      @Override
      public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
      }
    
      @Override
      public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
      }
    }j

## App.js
### Use like this.

    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     * @flow
     */
    
    import React, { Component } from 'react';
    import { StyleSheet } from 'react-native';
    import MapView from 'react-native-maps';
    
    
    export default class App extends Component {
    
      state = {
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      };
      render() {
        return (
          <MapView
            style={styles.map}
            region={this.state.region}
          />
        );
      }
    }
    
    const styles = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
      }
    
    });
