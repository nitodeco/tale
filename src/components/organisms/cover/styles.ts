import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    fontSize: 42,
    fontWeight: 'normal',
    color: 'black',
  },
  author: {
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
  },
}); 

export default styles;