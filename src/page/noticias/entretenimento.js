import * as React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Action from './action.noticia';
import Header from '../../component/Header';
import Article from './article';

function Atualidades(props) {
  const {ListEntretenimento = [], nwstate} = useSelector(
    state => state.Noticias,
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(Action.getEntretenimento());
  }, []);

  const _onRefresh = () => {
    setRefreshing(true);
    pullRefresh();
  };

  const pullRefresh = () => {
    dispatch(Action.getEntretenimento());
    setRefreshing(false);
  };

  if (nwstate === 'FETCHING') {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator color="#ffd700" size={40} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={ListEntretenimento.articles}
          renderItem={({item, index}) => (
            <Article
              data={item}
              index={index}
              paramTabFocus={props.route.name}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Atualidades;
