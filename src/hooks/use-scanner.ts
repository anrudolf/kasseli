import { onMounted, onBeforeUnmount } from "vue";

const TIMEOUT_MS = 15; // try values 10...20

const MIN_LEN = 4;

export default function (
  cb: (code: string) => any,
  codeSizes: Array<number> = []
) {
  let timeoutHandler = 0;
  let inputString = "";

  const keydown = (e: KeyboardEvent) => {
    if (inputString.length >= MIN_LEN && e.code == "Enter") {
      e.preventDefault();
    }

    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
      inputString += String.fromCharCode(e.keyCode);
    }

    timeoutHandler = setTimeout(() => {
      if (inputString.length < MIN_LEN) {
        inputString = "";
        return;
      }
      const filtered = inputString.replace(/(\r\n|\n|\r)/gm, "");

      if (cb != null) {
        if (codeSizes.length == 0) {
          cb(filtered);
        } else {
          if (codeSizes.includes(filtered.length)) {
            cb(filtered);
          }
        }
      }

      inputString = "";
    }, TIMEOUT_MS);
  };

  const initialize = () => {
    document.addEventListener("keydown", keydown);
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      inputString = "";
    }, TIMEOUT_MS);
  };

  const close = () => {
    document.removeEventListener("keydown", keydown);
  };

  onMounted(initialize);
  onBeforeUnmount(close);

  return close;
}
