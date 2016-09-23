>刚接触RN不久，代码写的很烂，如果您有更好的优化（代码和性能都可），感谢您PR给我

![演示效果](http://upload-images.jianshu.io/upload_images/1385290-1aec85d6e9e033dc.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##集成步骤
#####1.安装gl-react `npm install gl-react --save`
> 可以参考其语法自定义滤镜 https://github.com/ProjectSeptemberInc/gl-react

#####2.安装gl-react-native `npm install gl-react-native --save`

#####3.配置gl-react-native
iOS配置：
>打开node_modules-gl-react-native-ios，将RNGL.xcodeproj拖到你的iOS项目Libraries目录中，并在Build Phasses的Link Binary With Libraries链接libRNGL.a库文件

![iOS.png](http://upload-images.jianshu.io/upload_images/1385290-a7be7f9d32d59582.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
或 Cocapods:`pod 'RNGL', :path => './node_modules/gl-react-native'`

安卓配置：
1. android/settings.gradle:: Add the following snippet
`include ':RNGL'`
`project(':RNGL').projectDir = file('../node_modules/gl-react-native/android')`
2. android/app/build.gradle: Add in dependencies block.
`compile project(':RNGL')`
3. in your MainApplication (or equivalent) the RNGLPackage needs to be added. Add the import at the top:
`import com.projectseptember.RNGL.RNGLPackage;`
4. In order for React Native to use the package, add it the packages inside of the class extending ReactActivity.
`@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    ...
    new RNGLPackage()
  );
}`

#####4.安装gl-react-image
`npm install gl-react-image --save`
> GLImage是一个高性能的组件，用来替换Image组件，来提高渲染滤镜的速度（你依然可以使用Image组件，只是会收到一个警告）
######这里需要注意的是，GLImage引入本地资源需要通过resolveAssetSource包装一层，如：
`<GLImage    source={resolveAssetSource(require('./replace.png'))}    imageSize={{ width: 400, height: 400 }}    resizeMode="stretch"/>`

#####5.安装封装的滤镜组件gl-react-instagramfilters
`npm install gl-react-instagramfilters --save`
一共封装了19款常用滤镜
>F1977、Amaro、Brannan、Earlybird、Hefe、Hudson、Inkwell、Lokofi、LordKelvin、Nashville、Normal、Rise、Sierra、Sutra、Toaster、Valencia、Walden、XproII

#####6.运行以下Demo即可看到网络图片被滤镜渲染的效果
~~~
import React, { Component ,PropTypes} from 'react';
import {Text,View,TouchableOpacity, Navigator,StyleSheet,Platform,Dimensions, Image,TextInput} from 'react-native';
import {F1977,Amaro,Brannan,Earlybird,Hefe,Hudson,Inkwell,Lokofi,LordKelvin,Nashville,Normal,Rise,Sierra,Sutro,Toaster,Valencia,Walden,XproII} from "gl-react-instagramfilters";
import {Surface ,resolveAssetSource} from "gl-react-native";
const {Image: GLImage} = require("gl-react-image");

<Surface height={1024} width={693}>
  <Hudson>
    <GLImage
      source="http://i.imgur.com/tCatS2c.jpg"
      imageSize={{ width: 1024, height: 693 }}
      resizeMode="cover"
    />
  </Hudson>
</Surface>
~~~

#####7.安装相机组件，实现时时拍照滤镜渲染
1. 安装 `npm install react-native-camera@https://github.com/lwansbrough/react-native-camera.git --save`
2. 链接 `react-native link react-native-camera`

>可以参考文档的Demo进行相机测试   https://github.com/lwansbrough/react-native-camera
######这里需要注意的是，this.camera.capture()的Promise中，captureTarget属性只有是Camera.constants.CaptureTarget.memory时才能.then到data、width 、height、duration、size等信息，如果不是只能获取到path路径。
