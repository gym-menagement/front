import 'dart:io';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

// const emulatorIp = '10.0.2.2:3000';
// const simulatorIp = '127.0.0.1:3000';

const localIp = '127.0.0.1:9000/api';
const serverIp = '141.164.56.77:9004/api';

// final ip = Platform.isIOS ? simulatorIp : emulatorIp;
const local = false;
const ip = local ? localIp : serverIp;
