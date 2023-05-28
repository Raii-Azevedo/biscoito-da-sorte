import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import biscoitoAbertoImg from './img/biscoitoAberto.png';
import styles from './styles'; // Importa os estilos do arquivo styles.js

// import { Container } from './styles';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textoCookie: 'Sua frase (des)motivacional do dia',
      img: biscoitoAbertoImg,
      ativo: true, // Variável de estado para controlar o estado do botão
      tempoRestante: null, // Variável de estado para armazenar o tempo restante
    };

    this.verMensagem = this.verMensagem.bind(this);

    const frases = require('./frases'); // Puxa a frase do arquivo frases.js

    function escolherFraseAleatoria() {
      const indiceAleatorio = Math.floor(Math.random() * frases.length);
      return frases[indiceAleatorio];
    }

    console.log(escolherFraseAleatoria()); // Imprime uma frase aleatória da lista

  }

  componentDidMount() {
    this.iniciarCronometro();
  }

  iniciarCronometro() {
    setInterval(() => {
      const agora = new Date();
      const horaAtual = agora.getHours();
      const minutosAtual = agora.getMinutes();
      const segundosAtual = agora.getSeconds();

      const horaAtivacao = 24; // Hora em que o botão será ativado novamente (24 horas)
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
      this.setState({
        textoCookie: '"' + frases[numeroAleatorio] + '"',
        img: require('./img/biscoitoAberto.png'),
        ativo: false, // Desativa o botão ao ser clicado
      });

      setTimeout(() => {
        this.setState({ ativo: true }); // Ativa o botão novamente após 24 horas
      }, 24 * 60 * 60 * 1000); // Tempo em milissegundos (24 horas)
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
    return (
      <View style={{ backgroundColor: '#dd7b22', flex: 1 }}>
        <View style={{ flex: 1,margin: 15, backgroundColor: '#fff' }}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Biscoito da Sorte</Text>

            <Image source={this.state.img} style={styles.img} />

            <Text style={styles.textoCookie}>{this.state.textoCookie}</Text>

            <TouchableOpacity
              style={[styles.botao, !this.state.ativo && styles.botaoInativo]} // Estilo diferente quando o botão estiver desativado
              onPress={this.verMensagem}
              disabled={!this.state.ativo} // Desativa o botão usando a propriedade disabled
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
      </View>
    );
  }
}

export default App;