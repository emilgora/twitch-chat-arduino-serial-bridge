const delay = require('delay');
const tmi = require('tmi.js');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('insertComPortHere', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
port.on("open", () => {
  console.log('Serial port open.');
});
parser.on('data', data =>{
  console.log('Data recieved from arduino:', data);
});

const options = {
  options: {
    debug: true,
  },
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: 'insertReaderAccountHere',
    password: 'insertReaderAccountPasswordHere'
  },
  channels: ['insertYourChannelHere'],
};

const client = new tmi.client(options);

client.connect();

client.on("chat", (channel, userstate, message, self) => {
    if (message === '!water' && userstate['mod'] === true){
      console.log('New donator');

      (async () => {
          port.write('1');
          await delay(1500);
          port.write('0');
      })();
    }

});
