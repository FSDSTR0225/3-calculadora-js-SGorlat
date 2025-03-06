const display = document.getElementById("display");
const botonEncender = document.getElementById("boton-on");
const botonApagar = document.getElementById("boton-off");
const botonBorrar = document.getElementById("boton-del");
const botonResultado = document.getElementById("boton-resultado");

const actualizarDisplay = () => {
  display.textContent = `${primerNumero} ${operador} ${segundoNumero}`;
};

let primerNumero = "";
let segundoNumero = "";
let operador = "";

const agregarNumero = (numero) => {
  if (resultadoMostrado) {
    primerNumero = numero;
    resultadoMostrado = false;
  } else if (!esperandoOperador) {
    primerNumero += numero;
  } else {
    segundoNumero += numero;
  }
  actualizarDisplay();
};

let esperandoOperador = false;
let resultadoMostrado = false;

const seleccionarOperador = (simbolo) => {
  if (primerNumero === "") {
    return;
  }
  if (esperandoOperador && segundoNumero === "") {
    operador = simbolo;
  } else if (segundoNumero !== "") {
    calcularResultado();
    operador = simbolo;
    esperandoOperador = true;
  } else {
    operador = simbolo;
    esperandoOperador = true;
  }
  actualizarDisplay();
};

const calcularResultado = () => {
  if (segundoNumero === "") {
    return;
  } else {
    let numero1 = Number(primerNumero);
    let numero2 = Number(segundoNumero);
    let resultado;

    switch (operador) {
      case "+":
        resultado = numero1 + numero2;
        break;
      case "-":
        resultado = numero1 - numero2;
        break;
      case "*":
        resultado = numero1 * numero2;
        break;
      case "/":
        if (numero2 === 0) {
          resultado = "ERROR";
        } else {
          resultado = numero1 / numero2;
        }
        break;
      case "%":
        resultado = (numero1 * numero2) / 100;
        break;
      default:
        resultado = "Operador invalido";
    }
    if (resultado !== "Operador invalido") {
      display.textContent = resultado;
      primerNumero = resultado.toString();
      segundoNumero = "";
      operador = "";
      esperandoOperador = false;
      resultadoMostrado = true;
    } else {
      display.textContent = "Error en la operación";
    }
  }
};

const botonesNumeros = document.querySelectorAll(".numero");

const reiniciarCalculadora = () => {
  primerNumero = "";
  segundoNumero = "";
  operador = "";
  esperandoOperador = false;
  resultadoMostrado = false;
  actualizarDisplay();
};

const borrarUltimoNumero = () => {
  if (!esperandoOperador && primerNumero.length > 0) {
    primerNumero = primerNumero.slice(0, -1);
  } else if (esperandoOperador && segundoNumero.length > 0) {
    segundoNumero = segundoNumero.slice(0, -1);
  }
  actualizarDisplay();
};

const apagarCalculadora = () => {
  document.querySelector(".carcasa").style.display = "none";
};

botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => agregarNumero(boton.textContent));
});

const botonesOperadores = document.querySelectorAll(".operador");

botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () => seleccionarOperador(boton.textContent));
});

botonResultado.addEventListener("click", calcularResultado);

botonEncender.addEventListener("click", reiniciarCalculadora);
botonBorrar.addEventListener("click", borrarUltimoNumero);
botonApagar.addEventListener("click", apagarCalculadora);
