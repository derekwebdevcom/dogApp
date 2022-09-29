import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal as RNModal,
  GestureResponderEvent,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {FC, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalColors, globalEnums, globalStrings} from '../global';

interface ModalProps {
  visible: boolean;
  dog: string;
  dogData: string;
  isLoading: boolean;
  dataError: boolean;
  onPressModalClose: (event: GestureResponderEvent) => void;
}

export const Modal: FC<ModalProps> = ({
  visible,
  dog,
  isLoading,
  dataError,
  onPressModalClose,
  dogData,
}) => {
  const [dogName, setDogName] = useState<string>();
  const [imageData, setImageData] = useState<string>();

  useEffect(() => {
    setDogName(dog[0]?.toUpperCase() + dog.slice(1));
    setImageData(dogData);
  }, [dog, dogData]);

  const itemSeparator = <View style={styles.separator} />;

  return (
    <RNModal animationType={'fade'} transparent visible={visible}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.closeIcon}>
            <AntDesign
              name={globalEnums.closeCirle}
              color={globalColors.paletteLightText}
              size={30}
              onPress={onPressModalClose}
            />
          </View>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{dogName}</Text>
          </View>
          {dataError && (
            <View style={styles.activityIndicator}>
              <Text style={styles.errorMessage}>
                {globalStrings.netWorkError} {dataError}
              </Text>
            </View>
          )}
          {isLoading ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator
                size="large"
                color={globalColors.palettePink}
              />
              <Text style={styles.errorMessage}>
                {globalStrings.pleaseWait}
              </Text>
            </View>
          ) : (
            <FlatList
              removeClippedSubviews
              maxToRenderPerBatch={10}
              ItemSeparatorComponent={itemSeparator as any}
              data={imageData as any}
              renderItem={({item, index}) => (
                <>
                  <Image
                    key={index}
                    source={{uri: item}}
                    style={styles.image}
                  />
                </>
              )}
              keyExtractor={index => index}
            />
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
    width: '85%',
    height: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: globalColors.shadowBackgroundPink,
    borderRadius: 10,
  },
  modal: {
    backgroundColor: globalColors.shadowBackground,
    height: '100%',
    width: '100%',
  },
  separator: {
    height: 1,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 20,
    color: globalColors.paletteLightText,
    fontWeight: 'bold',
    marginTop: 10,
  },
  activityIndicator: {
    marginTop: '50%',
    marginBottom: 10,
  },
  image: {
    height: 400,
    width: '100%',
    borderWidth: 1,
    borderColor: globalColors.shadowBackground,
    borderRadius: 10,
  },
  closeIcon: {
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: globalColors.paletteLightText,
    fontWeight: 'bold',
  },
  modalTitleContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 15,
  },
});
