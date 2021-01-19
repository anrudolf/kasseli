import { onMounted, onBeforeUnmount } from "vue";

const TIMEOUT_MS = 15; // try values 10...20

export default function(cb = null) {
  let timeoutHandler = 0;
  let inputString = "";

  const keyup = (e) => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
      inputString += String.fromCharCode(e.keyCode);
    }

    timeoutHandler = setTimeout(() => {
      if (inputString.length <= 3) {
        inputString = "";
        return;
      }
      const filtered = inputString.replace(/(\r\n|\n|\r)/gm, "");
      cb && cb(filtered);

      inputString = "";
    }, TIMEOUT_MS);
  };

  const initialize = () => {
    document.addEventListener("keypress", keyup);
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      inputString = "";
    }, TIMEOUT_MS);
  };

  const close = () => {
    document.removeEventListener("keypress", keyup);
  };

  onMounted(initialize);
  onBeforeUnmount(close);

  return close;
}
