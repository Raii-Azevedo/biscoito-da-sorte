import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor:'fff',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  titulo: {
    textAlign: 'center',
    color: '#dd7b22',
    fontSize: 35,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20, // Adiciona espaço nas laterais
  },
  
  img: {
    width: 250,
    height: 250,
  },

  imagem:{
    width: 30,
    height: 30,
    marginRight: 25,
    alignSelf: 'flex-end', 
  },

  imagemCustomizada: {
    width: 30,
    height: 30,
    marginRight: 25,
    alignSelf: 'flex-end',
  },

  textoCookie: {
    fontSize: 20,
    color: '#dd7b22',
    margin: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingBottom:10,
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
