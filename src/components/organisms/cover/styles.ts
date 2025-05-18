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
    fontWeight: 'bold',
    color: '#6D3D14',
  },
  author: {
    fontSize: 18,
    fontWeight: '300',
    color: '#6D3D14',
  },
  readingTime: {
    fontSize: 16,
    fontWeight: '300',
    color: '#E39F64',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

export default styles;