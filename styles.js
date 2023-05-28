import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor:'#fff',
  },

  titulo: {
    backgroundColor: '#dd7b22',
    textAlign: "center",
    color: '#fff',
    fontSize: 40,
    paddingTop: 30,
    paddingBottom: 40,
    fontWeight: 'bold',
  },

  img: {
    width: 250,
    height: 250,
  },

  textoCookie: {
    fontSize: 20,
    color: '#dd7b22',
    margin: 30,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  botao: {
    width: 230,
    height: 50,
    borderWidth: 2,
    borderColor: '#dd7b22',
    borderRadius: 25,
  },

  btnArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dd7b22',
  },

  botaoInativo: {
    backgroundColor: '#ccc', // Estilo diferente para o botão desativado    
  },

  cronometro: {
    fontSize: 16,
    marginTop: 10,
    color: '#dd7b22',
    textAlign: 'center',
  },
});

export default styles;
