import React from 'react';
import { useState } from 'react';
import {Text, ScrollView, View, StatusBar, TextInput, Image, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import { Fonts, Images, Metrics, Colors } from 'Constants';
import { McText, McImage, McAvatar, PlayButton } from 'Components';
import { dummyData } from 'Mock';
import BottomBar from '../Library/BottomBar';

const Home = ({ navigation }) => {
    const [selectedEnv, setSelectedEnv] = useState('vn');

    const initialLikeState = dummyData.Favorite.reduce((likeSongState, item) => {
        likeSongState[item.id] = item.like;
        return likeSongState;
      }, {});
    
    const [likeSongState, setLikeSongState] = useState(initialLikeState);

    const clickLikeSong = async (itemId) => {
        setLikeSongState(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
          }));
    }

    const _renderAlbums = ({ item, index}) => {
        return(
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('Thealbums',{selectedAlbum: item})
            }}>
                <View>
                    <View style={{
                        marginTop:16,
                        marginLeft: index === 0? 24:0,
                        marginRight:index === dummyData.Albums.length - 1?0:24
                    }}>
                        <McImage key={index} source={item.thumbnail} style={{marginBottom:12, borderRadius:20}}/>
                        <McText semi size={16} color={Colors.grey5}>Albums {item.name}</McText>
                        <McText bold size={12} color={Colors.grey3} style={{marginTop: 4, width: 153}}>{item.artist}</McText>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const _renderArtist = ({ item, index}) => {
        return(
            <View>
                <View style={{
                    marginTop:16,
                    marginLeft: index === 0? 24:0,
                    marginRight:index === dummyData.Artist.length - 1?0:24
                }}>
                    <McImage key={index} source={item.thumbnail} style={{marginBottom:12, borderRadius:20}}/>
                    <McText medium size={12} color={Colors.grey3} style={{marginTop: 4, width: 153}}>{item.title}</McText>
                </View>
            </View>
        )
    }
    
    return (
        <Container>
            <StatusBar barStyle='light-content'/>

            {/* Thanh chức năng */}
            <HeaderSection>
                <TouchableOpacity onPress={()=> navigation.navigate('Option')}>
                    <McImage source={Images.profile} style={{height: 30, width: 30}}></McImage>
                </TouchableOpacity>
                
                <SearchSetion>
                    <McImage 
                        source={Images.find}
                        style={{marginLeft: 12, marginRight:10, width: 20, height: 20}}
                    ></McImage>
                    <TextInput 
                        placeholder="Nhập tên bài hát hoặc nghệ sĩ"
                        placeholderTextColor={Colors.grey3}
                        style={{
                            color: Colors.grey4,
                            fontSize: 12
                        }}
                    ></TextInput>
                </SearchSetion>
                <TouchableOpacity onPress={()=> navigation.navigate('Notification')}>
                    <McImage source={Images.bell}/>
                </TouchableOpacity>
                
            </HeaderSection>

            {/* Nội dung thanh cuộn */}
            <ScrollView>
                    <SwiperBanner>
                        <Swiper
                            style={{borderRadius: 10}}
                            autoplay={true}
                            autoplayTimeout={2}
                            paginationStyle={{ top: -110}}
                            dot={<View style={{
                                    backgroundColor:'#464646', 
                                    width: 5, 
                                    height: 5,
                                    borderRadius: 5, 
                                    marginLeft: 3, 
                                    marginRight: 3, 
                                    marginTop: 3, 
                                    marginBottom: 3,}} 
                            
                                />}
                            activeDot={<View style={{
                                    backgroundColor: '#B90078',
                                    width: 20,
                                    height: 5,
                                    borderRadius: 40, 
                                    marginLeft: 3, 
                                    marginRight: 3, 
                                    marginTop: 3, 
                                    marginBottom: 3,}} />}>
                            <View>
                                <Image style={{width: 327,height: 114,borderRadius: 10}} source={require('Assets/images/amee_artist_album.png') } />
                            </View>
                            <View>
                                <Image style={{width: 327,height: 114,borderRadius: 10}} source={require('Assets/images/mono-artist.png')} />
                            </View>
                            <View>
                                <Image style={{width: 327,height: 114,borderRadius: 10}} source={require('Assets/images/mck-artist.png') } />
                            </View>
                            <View>
                                <Image style={{width: 327,height: 114,borderRadius: 10}} source={require('Assets/images/mono-artist.png')} />
                            </View>
                        </Swiper>
                    </SwiperBanner>

                    <TitleSection>
                        <McText medium size={20} color={Colors.grey4}>Top bài hát yêu thích</McText>                   
                        <McImage source={Images.right}/>
                    </TitleSection>
            
                    <ViewEnv>
                        <TouchableOpacity
                            style={{
                                backgroundColor: selectedEnv === 'vn' ? Colors.accent2 : Colors.grey2,
                                marginRight: 10, 
                                height: 20,
                                borderRadius: 40,
                                width: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                                                            
                            }}
                            onPress={() => setSelectedEnv('vn')}
                        >
                            <McText bold style={{ 
                                color:  'white',
                                fontSize: 12,
                            }}>Việt Nam</McText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: selectedEnv === 'uk' ? Colors.accent2 : Colors.grey2,
                                marginRight: 10, 
                                height: 20,
                                borderRadius: 40,
                                width: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => setSelectedEnv('uk')}
                        >
                            <McText bold style={{ 
                                color:  'white',                        
                                fontSize: 12,
                            
                            }}>Âu mỹ</McText>
                        </TouchableOpacity>
                    </ViewEnv>
                
                    <View style={{marginTop: 12, height: 180}}>
                        <FlatList
                            
                            data={dummyData.Favorite}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                if (item.env === selectedEnv) {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => {
                                            navigation.navigate('Player',{selected: item})
                                        }}>
                                        <FavoriteItemView>
                                            <View style={{ flexDirection: "row" }}>
                                                <MusicCirle>
                                                    <McImage source={Images.music} />
                                                </MusicCirle>
                                                <View style={{ marginLeft: 12 }}>
                                                    <McText semi size={14} color={Colors.grey5}>
                                                    {item.title}
                                                    </McText>
                                                    <McText medium size={12} color={Colors.grey3} style={{ marginTop: 4 }}>
                                                    {item.artist}
                                                    </McText>
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => clickLikeSong(item.id)}>
                                                <McImage source={likeSongState[item.id] ? Images.fullLike : Images.like} />
                                            </TouchableOpacity>
                                            
                                        </FavoriteItemView>
                                        </TouchableWithoutFeedback>
                                    )
                                }
                            }}
                        />
                    </View>

                    <TitleSection>
                        <McText medium size={20} color={Colors.grey4}>Nghệ sĩ thịnh hành</McText>
                        <McImage source={Images.right}/>
                    </TitleSection>

                    <View>
                        <FlatList
                            keyExtractor={(item) => 'artist_' + item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                            data={dummyData.Artist}
                            renderItem={_renderArtist}
                        />
                    </View>

                    <TitleSection>
                        <McText medium size={20} color={Colors.grey4}>Albums được yêu thích</McText>
                        <McImage source={Images.right}/>
                    </TitleSection>

                    <View>
                        <FlatList
                            keyExtractor={(item) => 'albums_' + item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                            data={dummyData.Albums}
                            renderItem={_renderAlbums}
                        />
                    </View>

                    <View style={{
                        height:84,
                        marginTop: 30
                    }}
                    ></View>
                    </ScrollView>
            
            <BottomSection>
                <BottomBar>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 16,
                        marginVertical: 12
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <McImage source={require('Assets/images/thumb_3.png')} style={{
                                width: 38,
                                height: 38
                            }}/>
                            <View style={{marginLeft:12}}>
                                <McText bold size={16} color={Colors.grey5}>Chưa hề yêu em</McText>
                                <McText medium size={12} color={Colors.grey3} style={{marginTop: 4}}>Văn Tuyển</McText>
                            </View>
                        </View>
                        <PlayButton size={46} circle={41.28} icon={Images.stop}></PlayButton>
                    </View>
                </BottomBar>
            </BottomSection>

        </Container>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
    background_color: ${Colors.background};
`;

const HeaderSection = styled.View`
    marginTop: 10px;
    width: 327px;
    height: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    alignSelf: center;
`;

const SearchSetion = styled.View`
    width: 244px;
    height: 30px;
    border-radius: 30px;
    background_color: ${Colors.secondary};
    marginLeft: 12px;
    marginRight: 12px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const SwiperBanner = styled.View`
    marginTop: 30px;
    width: 327px;
    height: 114px;
    alignSelf: center;
`;

const TitleSection = styled.View`
    margin: 30px 24px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ViewEnv = styled.View`
    marginTop: 12px;
    marginLeft: 24px;
    flex-direction: row;
    justify-content: flex-start;
`;

const FavoriteItemView = styled.View`
    margin: 10px 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`;

const MusicCirle = styled.View`
    width: 42px;
    height: 42px;
    border-radius: 42px;
    background_color: ${Colors.secondary};
    justify-content: center;
    align-items: center;
`;

const BottomSection = styled.View`
    margin: 0px 24px;
    marginTop: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start; 
    position: absolute;
    bottom: 5px;
    left: 0px;
    z-index: 1;
`;

export default Home;