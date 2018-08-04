import web3 from './web3';

/* address del contrato deployado */
const address = '0x72E56d87F5FA2F9152415970817E24bA811Ac59D';

/* abi que da el console.log de deploy.js del contrato lottery
para dejar el json lindo, se puede instalar prettier */
const abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

/* crea una copia local del contrato para poder comunicarse con el contrato deployado
la copia se hace en los archivos de react, osea cuando se sube a un hosting la copia es ahi
y exporta esta copia local para poder usarse en otros archivos */
export default new web3.eth.Contract(abi, address);