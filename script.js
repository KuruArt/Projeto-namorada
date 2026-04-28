/**
 * Script para gerenciar o cronômetro de relacionamento
 * Calcula o tempo decorrido desde a data inicial
 */
function inicializarCronometro() {
  // Defina a data inicial aqui
  const dataInicial = new Date('2024-11-22T00:00:00');

  function atualizarTempo() {
    const agora = new Date();
    let diffMs = agora - dataInicial;

    // Total em segundos
    let totalSegundos = Math.floor(diffMs / 1000);

    const anos = Math.floor(totalSegundos / (365.25 * 24 * 60 * 60));
    totalSegundos %= Math.floor(365.25 * 24 * 60 * 60);

    const meses = Math.floor(totalSegundos / (30.44 * 24 * 60 * 60));
    totalSegundos %= Math.floor(30.44 * 24 * 60 * 60);

    const dias = Math.floor(totalSegundos / (24 * 60 * 60));
    totalSegundos %= 24 * 60 * 60;

    const horas = Math.floor(totalSegundos / (60 * 60));
    totalSegundos %= 60 * 60;

    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;

    let partes = [];

    if (anos > 0) partes.push(`${anos} ano${anos > 1 ? 's' : ''}`);
    if (meses > 0) partes.push(`${meses} mês${meses > 1 ? 'es' : ''}`);
    if (dias > 0) partes.push(`${dias} dia${dias > 1 ? 's' : ''}`);
    if (horas > 0) partes.push(`${horas} hora${horas > 1 ? 's' : ''}`);
    if (minutos > 0) partes.push(`${minutos} minuto${minutos > 1 ? 's' : ''}`);
    if (segundos > 0) partes.push(`${segundos} segundo${segundos > 1 ? 's' : ''}`);

    const texto = partes.join(', ');

    const elemento = document.getElementById('tempo-decorrido');
    if (elemento) {
      elemento.innerText = texto;
    }
  }

  // Atualiza a cada segundo
  setInterval(atualizarTempo, 1000);

  // Chamada inicial
  atualizarTempo();
}

/**
 * Script para trocar imagens da galeria automaticamente
 */
function inicializarGaleria() {
  const imagens = document.querySelectorAll('.imagem-galeria');
  
  if (imagens.length === 0) return; // Se não houver galeria, retorna

  let indiceAtual = 0;
  const totalImagens = imagens.length;

  function trocarImagem() {
    imagens[indiceAtual].classList.remove('ativo');
    indiceAtual = (indiceAtual + 1) % totalImagens;
    imagens[indiceAtual].classList.add('ativo');
  }

  setInterval(trocarImagem, 3000);
}

/**
 * Ativa o autoplay do player do Spotify
 */
function inicializarAutoplaySpotify() {
  // Tenta ativar o autoplay após interação do usuário
  const ativarAutoplay = () => {
    const spotifyFrame = document.getElementById('spotify-player');
    if (spotifyFrame) {
      try {
        // Tenta focar no iframe para ativar autoplay
        spotifyFrame.focus();
      } catch (e) {
        console.log('Autoplay será ativado após interação do usuário');
      }
    }
    // Remove o listener após a primeira interação
    document.removeEventListener('click', ativarAutoplay);
    document.removeEventListener('touchstart', ativarAutoplay);
  };

  // Aguarda primeira interação do usuário
  document.addEventListener('click', ativarAutoplay);
  document.addEventListener('touchstart', ativarAutoplay);
  
  // Também tenta após 2 segundos (em caso do usuário não interagir)
  setTimeout(ativarAutoplay, 2000);
}

/**
 * Inicializa todos os scripts ao carregar a página
 */
document.addEventListener('DOMContentLoaded', function() {
  inicializarCronometro();
  inicializarGaleria();
  inicializarAutoplaySpotify();
});
