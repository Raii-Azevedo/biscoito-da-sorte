import { captureScreen } from 'react-native-view-shot';
import Share from 'react-native-share';

const handleImagePress = async () => {
  try {
    // Captura a tela como uma imagem
    const uri = await captureScreen({
      format: 'jpg',
      quality: 0.8,
    });

    // Opções de compartilhamento
    const shareOptions = {
      url: uri,
      type: 'image/jpeg',
    };

    // Compartilha a imagem
    const result = await Share.open(shareOptions);

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Compartilhado com sucesso
        console.log('Compartilhado com sucesso');
      } else {
        // Compartilhamento cancelado
        console.log('Compartilhamento cancelado');
      }
    } else if (result.action === Share.dismissedAction) {
      // Compartilhamento cancelado
      console.log('Compartilhamento cancelado');
    }
  } catch (error) {
    // Ocorreu um erro durante o compartilhamento
    console.log('Erro ao compartilhar:', error.message);
  }
};

export default handleImagePress;
