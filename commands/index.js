const checkPhoneNumber = await import('./phone/index.mjs');
const checkIpAddress = await import('./ip/index.mjs');


const commands = {
    checkPhoneNumber,
    checkIpAddress,
}

// the below code fragment can be found in:
// helpers/phone/index.js
module.exports = commands;
