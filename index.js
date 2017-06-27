'use strict';

module.exports = () => {
  require('./lib/admins')(require('./lib/slashCommands')); // lmao sorry
  require('./lib/rtm')();
};
