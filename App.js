import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
 
// import { Container } from './styles';
 
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      textoCookie: 'Sua frase desmotivacional do dia', 
      img: require('./img/biscoito.png'),
    };
    
    this.verMensagem = this.verMensagem.bind(this);
 
    this.frases = [
      'Só existe uma coisa que te separa do seu objetivo: sua capacidade',
      'Ninguém precisa te humilhar, um espelho já faz isso’',
      'Muitos vão te dizer que você não vai conseguir, acredite neles',
      'Se alguém te ofendeu sem você merecer, volte lá e mereça',
      'Planeja os erros do futuro',
      'Nunca se esqueça: Você é limitado!',
      'Nenhum obstáculo é grande para quem desiste’',
      'Não seja foda, desista!',
      'Jesus te ama porque não convive com você',
      'Sonho é quando percebemos que é impossível realizá-lo',
      'Você não é incrível, e muito menos especial',
      'Você não pode tudo',
      'Lembre-se: Se fosse fácil você não faria',
      'Dias ruins são necessários para termos dias piores’',
      'Os sonhos antecedem os seus fracassos',
      'Desiste não. Tudo tem um momento certo para dar errado',
      'O que antes era inacreditável, agora está impossível',
      'Daqui a um ano você vai desejar ter desistido hoje',
      'Não tenha medo do fracasso, tenha certeza',
      'Mais um dia a menos',
      'Não faça hoje o que você pode fazer amanhã',
      'Um dia você está por baixo, no outro, você não está por cima',
      'O primeiro passo para a derrota é começar',
      'Vai! Se der medo, não vai',
      'O caminho é longo, mas a derrota é certa',
      'Não há nada tão inalcançável quanto seus sonhos',
      'As coisas podem piorar. Você que não tem imaginação',
      'Nem tudo está perdido. Muito ainda há pra se perder',
      'Não desanime com a derrota de hoje, amanhã tem outra',
      'Não deixe para amanhã o que você pode deixar pra lá.',
      'Malhar pra quê? Volte a dormir’',
      'Um passo de cada vez rumo a derrota eminente’',
      'Nunca deixe de desistir dos seu sonhos’',
      'Se alguém quiser te derrubar na vida, tem que te levantar primeiro',
      'Não deixe que os outros digam que você não consegue, diga você mesmo',
      'Você não é tão fracassado como todo mundo pensa. Você é bem pior',
      'Nunca permita que uma mensagem motivacional estúpida alegre seu dia de merda',
      'Você é capaz de perder tudo, mesmo que não tenha conquistado nada',
      'Nenhuma solução é maior que o seu problema’',
      'Você é mais fraco do que pensa e mais limitado do que imagina',
      'Resiliência: A incrível arte de se foder e continuar fodido',
      'Se você ama o que faz mude de área. Profissional bom é profissional com ódio. Não é atoa que o contrário de profissional é amador',
      'É hora de dar razão para aqueles que duvidaram de você'
    ];

  }
 
 
  verMensagem(){
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length);
    this.setState({
      textoCookie: '"' + this.frases[numeroAleatorio] + '"',
      img: require('./img/biscoitoAberto.png'),
    });
  }
  
  render(){
    return(
      <View style={styles.container} >
        <Text style={styles.titulo}>Biscoito da Desgraça</Text> 
      
      <Image
        source={this.state.img}
        style={styles.img}
      />

      <Text style={styles.textoCookie}>{this.state.textoCookie}</Text>

      <TouchableOpacity style={styles.botao} onPress={this.verMensagem}>
        <View style={styles.btnArea}>
          <Text style={styles.btnTexto}>Abrir Biscoito</Text>
        </View>
      </TouchableOpacity>  

      </View>   
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    alignItems:'center',  
  },

  titulo:{
    backgroundColor: '#dd7b22',
    textAlign:"center",
    color:'#fff',
    fontSize:40,
    paddingTop:30,
    paddingBottom: 30,
    fontWeight: 'bold',
  },

  img:{
    width:250,
    height:250,
  },

  textoCookie:{
    fontSize: 20,
    color: '#dd7b22',
    margin:30, 
    fontStyle: 'italic',
    textAlign: 'center',
  },

  botao:{
    width: 230,
    height: 50,
    borderWidth: 2,
    borderColor: '#dd7b22',
    borderRadius:25,
  },

  btnArea:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTexto:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dd7b22',
  }
});

export default App;