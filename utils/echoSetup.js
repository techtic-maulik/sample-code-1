// echoSetup.js

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const echo = new Echo({
  broadcaster: 'pusher',
  key: 'f7007274bb1df50ec49a',
  cluster: 'ap2',
  encrypted: true,
  pusher: Pusher,
});

export default echo;
