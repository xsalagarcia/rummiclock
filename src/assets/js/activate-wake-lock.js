/**
 * This script tries to activate Wake Lock, preventing screen lock on mobile devices.
 */

const wakeLock = navigator.wakeLock.request("screen");
wakeLock.then(()=>{console.log("Wake Lock active")});
wakeLock.catch(()=>console.log("Error trying to activate Wake lock"));