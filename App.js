import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import biscoitoAbertoImg from './img/biscoitoAberto.png';
import styles from './styles';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoScreen = ({ onVideoEnd }) => {
  return (
    <View style={styles.container}>
      <Video
        source={require('./video/Cookie.mp4')} // Caminho do vídeo
        style={styles.video}
        resizeMode="cover"
        muted={true}
        repeat={false}
        onLoad={() => {
          // Lógica a ser executada quando o vídeo é carregado
        }}
        onEnd={onVideoEnd} // Chama a função passada como prop onVideoEnd quando o vídeo termina
      />
    </View>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVideo: true, // Variável de estado para controlar a exibição do vídeo
      textoCookie: 'Sua frase (des)motivacional do dia',
      img: biscoitoAbertoImg,
      ativo: true, // Variável de estado para controlar o estado do botão
      tempoRestante: null, // Variável de estado para armazenar o tempo restante
    };

    this.verMensagem = this.verMensagem.bind(this);
  }

  componentDidMount() {
    this.recuperarTempoRestante();
    this.iniciarCronometro();
  }

  componentWillUnmount() {
    this.salvarTempoRestante();
  }

  async salvarTempoRestante() {
    const { tempoRestante } = this.state;
    try {
      await AsyncStorage.setItem('tempoRestante', JSON.stringify(tempoRestante));
    } catch (error) {
      console.log('Erro ao salvar tempo restante:', error);
    }
  }

  async recuperarTempoRestante() {
    try {
      const tempoRestanteString = await AsyncStorage.getItem('tempoRestante');
      const tempoRestante = JSON.parse(tempoRestanteString);
      this.setState({ tempoRestante });
    } catch (error) {
      console.log('Erro ao recuperar tempo restante:', error);
    }
  }

  iniciarCronometro() {
    setInterval(() => {
      const agora = new Date();
      const horaAtual = agora.getHours();
      const minutosAtual = agora.getMinutes();
      const segundosAtual = agora.getSeconds();

      const horaAtivacao = 24;
      const minutosAtivacao = 0;
      const segundosAtivacao = 0;

      const tempoRestante =
        (horaAtivacao - horaAtual) * 60 * 60 +
        (minutosAtivacao - minutosAtual) * 60 +
        (segundosAtivacao - segundosAtual);

      this.setState({ tempoRestante });
    }, 1000);
  }

  verMensagem() {
    const frases = require('./frases');

    if (this.state.ativo) {
      let numeroAleatorio = Math.floor(Math.random() * frases.length);
      this.setState(
        {
          textoCookie: '"' + frases[numeroAleatorio] + '"',
          img: require('./img/biscoitoAberto.png'),
          ativo: false,
        },
        () => {
          this.salvarTempoRestante();
          setTimeout(() => {
            this.setState({ ativo: true });
          }, 24 * 60 * 60 * 1000);
        }
      );
    }
  }

  formatarTempoRestante() {
    const { tempoRestante } = this.state;

    if (tempoRestante === null || tempoRestante <= 0) {
      return '';
    }

    const horas = Math.floor(tempoRestante / 3600);
    const minutos = Math.floor((tempoRestante % 3600) / 60);
    const segundos = tempoRestante % 60;

    return `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos
      }:${segundos < 10 ? '0' + segundos : segundos}`;
  }

  render() {
    const { showVideo } = this.state;

    return (
      <View style={{ backgroundColor: '#dd7b22', flex: 1 }}>
        {showVideo ? (
          <VideoScreen onVideoEnd={() => this.setState({ showVideo: false })} />
        ) : (
          <View style={{ flex: 1, margin: 15, backgroundColor: '#fff' }}>
            <View style={styles.container}>
              <Text style={styles.titulo}>Biscoito da Sorte</Text>

              <Image source={this.state.img} style={styles.img} />

              <Text style={styles.textoCookie}>{this.state.textoCookie}</Text>

              <TouchableOpacity
                style={[styles.botao, !this.state.ativo && styles.botaoInativo]}
                onPress={this.verMensagem}
                disabled={!this.state.ativo}
              >
                <View style={styles.btnArea}>
                  <Text style={styles.btnTexto}>Abrir Biscoito</Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.cronometro}>
                {this.state.ativo ? '' : `Você poderá abrir um novo cookie em: ${this.formatarTempoRestante()}`}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default App;
