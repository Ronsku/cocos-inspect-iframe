window.addEventListener("message", function (event) {
  if (event.origin !== "http://localhost:7456") return;

  if (event.data === "hello") {
    event.source.postMessage("Hello from localhost:5000", event.origin);
  }
});
