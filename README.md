#Para configurar los mapas de react-native-maps

1. npm install react-native-maps
2. archivo: android/build.gradle
     include ':react-native-maps'
     project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')

      include ':app'
3. archivo: android/gradle/wrapper/gradle-wrapper.properties
      distributionUrl = https://services.gradle.org/distributions/gradle-4.1-all.zip
4. archivo: android/app/build.gradle
      compileSdkVersion 25
       buildToolsVersion "25.0.1"
       
       compile project(':react-native-maps')
       
       compile (project(':react-native-maps')){
         exclude group: 'com.google.android.gms'
       }
       
       cambiar compile por implementation
 5. archivo: android/app/src/main/java/com/specialtransport/MainApplication.java
       import com.airbnb.android.react.maps.MapsPackage;
       
       @Override
           protected List<ReactPackage> getPackages() {
             return Arrays.<ReactPackage>asList(
                 new MainReactPackage(),
                   new MapsPackage()
             );
           }
 6. archivo: android/app/src/main/java/AndroidManifest.xml
     
   ' <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="AIzaSyCvp8eSlpefOHMcFelYll0QlJHB2tliP1s"/>'
      
     
7. archivo: android/build.gradle

    repositories {
        jcenter()
        google()
    }
     classpath 'com.android.tools.build:gradle:3.0.1'
