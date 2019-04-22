import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from './widgets/LogoHeader';
import { CATEGORY_SCREEN } from '../tools/constants';

const styles = StyleSheet.create({
  catButton: {
    backgroundColor: 'lightsteelblue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    borderWidth: 0.5,
    borderColor: '#000000',
    paddingLeft: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});

class CategoryListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Good Uncle Menu',
    header: <LogoHeader signedIn navigation={navigation} />,
  });

  _itemClicked = (catID, catName) => {
    this.props.navigation.navigate(CATEGORY_SCREEN, {
      id: catID,
      name: catName,
    });
  }

  render = () => (
    <View>
      <FlatList
        data={Object.values(this.props.categoryDetails)}
        renderItem={
          ({ item }) => (
            <TouchableHighlight
              style={styles.catButton}
              onPress={() => this._itemClicked(item.id, item.name)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableHighlight>
          )
        }
      />
    </View>
  );
}

CategoryListScreen.propTypes = {
  categoryDetails: PropTypes.array.isRequired,
};


// =================== CONNECT TO REDUX STORE ==================== //

const mapStateToProps = state => ({
  categoryDetails: state.foodStore.categoryDetails,
});

export default connect(mapStateToProps, null)(CategoryListScreen);

