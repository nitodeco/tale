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
    color: '#333',
    marginVertical: 32,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  previewText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#AAAAAA',
    paddingHorizontal: 16,
    textAlign: 'center',
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  navButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    zIndex: 10,
  },
  topButton: {
    top: 0,
  },
  bottomButton: {
    bottom: 0,
  },
  disabledButton: {
    backgroundColor: '#f8f8f8',
  },
}); 

export default styles;