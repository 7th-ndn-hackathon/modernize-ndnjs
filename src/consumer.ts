import Debug = require("debug");
import moment = require("moment");
import ndn = require("ndn-js");

const debug = Debug("app");

const name = new ndn.Name("/ndn/edu/arizona/ping/" + Math.floor(Math.random() * 100000000));
const interest = new ndn.Interest(name);

const face = new ndn.Face(new ndn.TcpTransport(), new ndn.TcpTransport.ConnectionInfo("hobo.cs.arizona.edu", 6363));
const t0 = moment();
face.expressInterest(interest,
  (interest1, data: ndn.Data) => {
    const t1 = moment();
    debug("Data arrived %s, RTT is %dms", data.getFullName().toUri(), t1.diff(t0));
  },
  () => {
    debug("Timeout");
  },
  (interest1, nack: ndn.NetworkNack) => {
    debug("Nack reason %d", nack.getReason());
  },
);
debug("Interest sent %s", interest.getName().toUri());
