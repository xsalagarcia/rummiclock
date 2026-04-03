/**
 * This script tries to activate Wake Lock, preventing screen lock on mobile devices.
 */
let wakeLock = null;
function requestWakeLock(){
    if (!("wakeLock" in navigator)) return;  // only if navigator suports wakeLock

    if (wakeLock === null && document.visibilityState === "visible"){  // only if we don't have wakeLock and document is visible
        const wakeLockPromise = navigator.wakeLock.request("screen");
        wakeLockPromise.then((wl)=>{
            wakeLock = wl;
            console.log("Wake Lock active");
            wakeLock.addEventListener("release", ()=>{  // when wakeLock release event occurrs wakeLock will be null, for the next activation.
                wakeLock = null;
                console.log("Wake lock released");
            })
        });
        wakeLockPromise.catch(()=>console.log("Error trying to activate Wake lock"));

    }
}

// activation everytime document visibility change.
document.addEventListener("visibilitychange", (e)=>{
    requestWakeLock();
});

requestWakeLock();  //first time activation.
