const getClientIPs = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ipList = forwarded ? forwarded.split(',').map(ip => ip.trim()) : [req.socket?.remoteAddress];
  
    let ipv4 = null;
    let ipv6 = null;
  
    for (const ip of ipList) {
      if (ip.startsWith('::ffff:')) {
        const v4 = ip.replace('::ffff:', '');
        if (!ipv4) ipv4 = v4;
      } else if (ip.includes(':')) {
        if (!ipv6) ipv6 = ip;
      } else {
        if (!ipv4) ipv4 = ip;
      }
    }
  
    return { ipv4, ipv6 };
  };
  
  module.exports = getClientIPs;
  