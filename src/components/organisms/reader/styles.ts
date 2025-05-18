import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    height: '100%',
    flex: 1,
  },
  yarnContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  previewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  previewSpace: {
    width: '100%',
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    fontSize: 24,
    lineHeight: 24,
    color: '#6D3D14',
    marginVertical: 32,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  previewText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#E39F64',
    paddingHorizontal: 16,
    textAlign: 'center',
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
}); 

export default styles;