const WebClient = require('@slack/client').WebClient;

module.exports = (cb) => {
  const web = new WebClient(process.env.SLACK_API_TOKEN);
  web.users.list((err, res) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, res.members.filter((member) => member.is_admin || member.is_owner));
    }
  });
};
