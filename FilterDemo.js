import React, { Component ,PropTypes} from 'react';
import {InteractionManager,ScrollView,Text,View,TouchableOpacity, Navigator,StyleSheet,Platform,Dimensions, Image,TextInput} from 'react-native';
let {width,height,scale}=Dimensions.get('window');

import {F1977,Amaro,Brannan,Earlybird,Hefe,Hudson,Inkwell,Lokofi,LordKelvin,Nashville,Normal,Rise,Sierra,Sutro,Toaster,Valencia,Walden,XproII} from "gl-react-instagramfilters";
import {Surface ,resolveAssetSource} from "gl-react-native";
const {Image: GLImage} = require("gl-react-image");
import Camera from 'react-native-camera';

export default class FilterDemo extends Component {

    constructor(props) {
        super();
        this.state = {
            data:{},
            type:1,
            filterImg:require('./replace.png'),
            cameraView:<Camera
                captureTarget={Camera.constants.CaptureTarget.temp}
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                captureMode = {Camera.constants.CaptureMode.fit}
                orientation={Camera.constants.Orientation.portrait}
                captureAudio = {false}
            >
            </Camera>,
            isCamera:true
        };
    }

    render() {
        return (

            <View style={styles.container}>
                <View>
                    {this.state.cameraView}
                </View>

                <ScrollView horizontal ={true} style={{height:100,marginTop:20}}>
                    <TouchableOpacity onPress={this.selectFilter}>
                        <Surface height={100} width={100}>
                            <GLImage
                                source={resolveAssetSource(this.state.filterImg)}
                                imageSize={{ width: 100, height: 100 }}
                                resizeMode="stretch"
                            />
                        </Surface>
                    </TouchableOpacity>

                    <Surface height={100} width={100}>
                        <F1977>
                            <GLImage
                                source={resolveAssetSource(this.state.filterImg)}
                                imageSize={{ width: 100, height: 100 }}
                                resizeMode="stretch"
                            />
                        </F1977>
                    </Surface>

                    <Surface height={100} width={100}>
                        <Sierra>
                            <GLImage
                                source={resolveAssetSource(this.state.filterImg)}
                                imageSize={{ width: 100, height: 100 }}
                                resizeMode="stretch"
                            />
                        </Sierra>
                    </Surface>

                    <Surface height={100} width={100}>
                        <Inkwell>
                            <GLImage
                                source={resolveAssetSource(this.state.filterImg)}
                                imageSize={{ width: 100, height: 100 }}
                                resizeMode="stretch"
                            />
                        </Inkwell>
                    </Surface>
                </ScrollView>

                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <Text style={styles.capture} onPress={this.takePicture}>拍摄</Text>
                    <Text style={styles.capture} onPress={this.cancelPicture}>取消</Text>
                </View>
            </View>
        )
    }

    // 拍照执行
    takePicture = ()=> {
        if (!this.state.isCamera){return}
        this.camera.capture()
            .then((data) => {
                this.setState({
                    data:data,

                });
                let img = {uri:this.state.data.path};
                this.setState({
                    filterImg:img,
                    cameraView:<Surface height={height - 400} width={width}>
                        <GLImage
                            source={resolveAssetSource(img)}
                            imageSize={{ width: width, height: height - 400 }}
                            resizeMode="stretch"
                        />
                    </Surface>,
                    isCamera:false
                });
            })
            .catch(err => console.error(err));
    };

    // 取消执行
    cancelPicture = ()=> {
        this.setState({
            cameraView:<Camera
                captureTarget={Camera.constants.CaptureTarget.temp}
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                captureMode = {Camera.constants.CaptureMode.fit}
                orientation={Camera.constants.Orientation.portrait}
                captureAudio = {false}
            >
            </Camera>,
            isCamera:true
        });
    };

    // 选中滤镜执行
    selectFilter = ()=>{
        let img = {uri:this.state.data.path};
        this.setState({
            cameraView:<Surface height={height - 400} width={width}>
                <XproII>
                    <GLImage
                        source={resolveAssetSource(img)}
                        imageSize={{ width, height: height - 400 }}
                        resizeMode="stretch"
                    /></XproII>
            </Surface>
        })
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: height - 400,
        width: width

    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
        fontSize:30
    },
    filterList:{
        width: 100,
        height: 100
    }

});

