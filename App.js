import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleImagePress } from './handleImagePress';
import frases from './frases'; // Assuming 'frases' is an array of phrases
import styles from './styles.js';

const VideoScreen = ({ onVideoEnd }) => {
  const videoPath = './video/Cookie.mp4';

  return (
    <View>
      <Video
        source={require(videoPath)}
        style={styles.video}
        resizeMode="cover"
        muted={true}
        repeat={false}
        onLoad={() => {
          // Logic to be executed when the video is loaded
        }}
        onEnd={onVideoEnd}
      />
    </View>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVideo: true,
      textoCookie: 'Sua frase (des)motivacional do dia',
      img: require('./img/biscoito.png'),
      ativo: true,
      tempoRestante: null,
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
    if (this.state.ativo) {
      const numeroAleatorio = Math.floor(Math.random() * frases.length);
      this.setState(
        {
          textoCookie: `"${frases[numeroAleatorio]}"`,
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

    return `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
  }

  render() {
    const { showVideo } = this.state;

    return (
      <View style={{ backgroundColor: '#dd7b22', flex: 1 }}>
        {showVideo ? (
          <VideoScreen onVideoEnd={() => this.setState({ showVideo: false })} />
        ) : (
          <View style={{ flex: 1, margin: 15, backgroundColor: '#fff', borderRadius: 10 }}>
            <View style={styles.container}>
              {/* Primeiro botão */}
              <TouchableOpacity onPress={handleImagePress}>
                <Image
                  source={require('./img/share.png')}
                  style={[styles.imagem, { position: 'relative', left: 130 }]}
                />
              </TouchableOpacity>

              <Text style={[styles.titulo, { fontSize: 30, fontWeight: 'bold', marginBottom: 20 }]}>
                BISCOITO DA SORTE
              </Text>

              <Image source={this.state.img} style={styles.img} />

              <Text style={[styles.textoCookie, { color: '#dd7b22', fontSize: 18, marginTop: 20 }]}>
                {this.state.textoCookie}
              </Text>

              {/* Segundo botão */}
              <TouchableOpacity
                style={[styles.botao, !this.state.ativo && styles.botaoInativo]}
                onPress={this.verMensagem}
                disabled={!this.state.ativo}
              >
                <View style={styles.btnArea}>
                  <Text style={styles.btnTexto}>ABRIR BISCOITO</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default App;
