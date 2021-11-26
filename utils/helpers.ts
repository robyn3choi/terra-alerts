import Pair from "types/Pair";

export function getPairSymbolsString(primarySymbol: string, secondarySymbol: string): string {
  return `${primarySymbol}/${secondarySymbol}`;
}

export function getPairPriceString(pair: Pair): string {
  return `${pair.price} ${pair.secondary.symbol}`;
}

export function notify(primarySymbol: string, secondarySymbol: string, price: number, isBelow: boolean, icon?: string) {
  const body = `${primarySymbol} is ${isBelow ? "below" : "above"} ${price} ${secondarySymbol}`;
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Terralert triggered!", { body, icon });
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Terralert triggered!", { body, icon });
      }
    });
  }
}

export function testNotify() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Test alert triggered!", { body: "This is the alert body." });
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Test alert triggered!", {
          body: "This is the alert body.",
        });
      }
    });
  }
}
