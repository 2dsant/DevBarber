import React, {useState, useEffect} from 'react';
import {Alert, Text} from 'react-native';
import {
  Container,
  Scroller,
  FakeSwipper,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  PageBody,
  UserInfoArea,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  LoadingIcon,
  ServiceArea,
  ServiceTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseBtnText,
  TestimonialArea,
  TestimonialInfo,
  TestimonialItem,
  TestimonialName,
  TestimonialBody,
} from './styles';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Api from '../../Api';

import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavClick = () => {
    setFavorited(!favorited);
    Api.setFavorite(userInfo.id);
  };

  const handleServiceChoose = key => {
    setSelectedService(key);
    setShowModal(true);
  };

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);
      let res = await Api.getBarber(userInfo.id);
      if (res.error == '') {
        setUserInfo(res.data);
        setFavorited(res.data.favorited);
      } else {
        Alert.alert('Erro: ' + res.error);
      }
      setLoading(false);
    };
    getBarberInfo();
  }, []);

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{height: 240}}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={{
              top: 15,
              right: 15,
              bottom: null,
              left: null,
            }}
            autoplay>
            {userInfo.photos.map((item, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{uri: item.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwipper />
        )}
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber />
            </UserInfo>
            <UserFavButton onPress={handleFavClick} activeOpacity={1}>
              {favorited ? (
                <FavoriteFullIcon width={24} height={24} fill="#FF0000" />
              ) : (
                <FavoriteIcon width={24} height={24} fill="#FF0000" />
              )}
            </UserFavButton>
          </UserInfoArea>

          {loading && <LoadingIcon size="large" color="#000000" />}

          <ServiceArea>
            <ServiceTitle>Lista de serviços</ServiceTitle>
            {userInfo.services?.map((item, key) => (
              <ServiceItem key={key}>
                <ServiceInfo>
                  <ServiceName>{item.name}</ServiceName>
                  <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                </ServiceInfo>
                <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                  <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                </ServiceChooseButton>
              </ServiceItem>
            ))}
          </ServiceArea>
          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons={true}
                prevButton={<NavPrevIcon width={35} height={35} />}
                nextButton={<NavNextIcon width={35} height={35} />}>
                {userInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width={44} height={44} fill="#FFF" />
      </BackButton>
      <BarberModal
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </Container>
  );
};
