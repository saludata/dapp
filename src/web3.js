import Web3 from 'web3';

/* window es una referencia de la variable global de window, toma el provider que inyecta por defecto metamask */
const web3 = new Web3(window.web3.currentProvider);

export default web3;