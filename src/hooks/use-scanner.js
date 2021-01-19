import { ref, onMounted, onBeforeUnmount } from "vue";

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
      console.log("onbarcodescanned", inputString);
      cb && cb(inputString);

      inputString = "";
    }, 10);
  };

  const initialize = () => {
    document.addEventListener("keypress", keyup);
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      inputString = "";
    }, 10);
  };

  const close = () => {
    document.removeEventListener("keypress", keyup);
  };

  onMounted(initialize);
  onBeforeUnmount(close);

  return close;
}
