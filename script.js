// ELEMENTOS DO HTML
const botaoIniciar = document.getElementById("iniciar");
const lacinho = document.getElementById("lacinho");
const pontosTexto = document.getElementById("pontos");
const tempoTexto = document.getElementById("tempo");
const aviso = document.getElementById("aviso-jogo");
const resultado = document.getElementById("resultado");

// INFORMAÇÕES DA PARTIDA
let pontos = 0;
let jogando = false;
let fimDaPartida = 0;
let intervalo;

// MUDA A POSIÇÃO DO LACINHO
function moverLacinho() {
  // Desconta os 60px do botão para ele não sair da área.
  const posicaoX = Math.random();
  const posicaoY = Math.random();

  lacinho.style.left = `calc((100% - 60px) * ${posicaoX})`;
  lacinho.style.top = `calc((100% - 60px) * ${posicaoY})`;
}

// FINALIZA A PARTIDA
function encerrarJogo() {
  clearInterval(intervalo);

  jogando = false;
  lacinho.hidden = true;
  aviso.hidden = false;

  aviso.textContent = "Partida concluída! Obrigada por brincar. 🩵";
  tempoTexto.textContent = "0";

  const palavra = pontos === 1 ? "lacinho" : "lacinhos";

  resultado.textContent =
    `Você coletou ${pontos} ${palavra}! 🎀`;

  botaoIniciar.disabled = false;
  botaoIniciar.textContent = "Jogar novamente";

  botaoIniciar.focus({ preventScroll: true });
}

// COMEÇA UMA NOVA PARTIDA
function iniciarJogo() {
  clearInterval(intervalo);

  pontos = 0;
  jogando = true;

  pontosTexto.textContent = "0";
  tempoTexto.textContent = "30";
  resultado.textContent = "";

  aviso.hidden = true;
  lacinho.hidden = false;

  botaoIniciar.disabled = true;
  botaoIniciar.textContent = "Boa sorte!";

  // Guarda o horário em que os 30 segundos terminam.
  fimDaPartida = Date.now() + 30000;

  moverLacinho();
  lacinho.focus({ preventScroll: true });

  intervalo = setInterval(function () {
    const tempoRestante = Math.max(
      0,
      Math.ceil((fimDaPartida - Date.now()) / 1000)
    );

    tempoTexto.textContent = tempoRestante;

    if (Date.now() >= fimDaPartida) {
      encerrarJogo();
    }
  }, 150);
}

// GANHA UM PONTO AO PEGAR O LACINHO
lacinho.addEventListener("click", function () {
  if (!jogando) {
    return;
  }

  // Impede pontos depois de o tempo acabar.
  if (Date.now() >= fimDaPartida) {
    encerrarJogo();
    return;
  }

  pontos++;
  pontosTexto.textContent = pontos;

  moverLacinho();
});

// BOTÃO DE INICIAR OU JOGAR NOVAMENTE
botaoIniciar.addEventListener("click", iniciarJogo);