export default function (error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "E-Mail ungültig";
    case "auth/user-not-found":
      return "Kein Account mit dieser Email gefunden";
    case "auth/wrong-password":
      return "Passwort nicht korrekt";
    case "auth/weak-password":
      return "Passwort ist zu schwach";
    case "auth/email-already-in-use":
      return "Ein Account mit dieser Email existiert bereits";
    case "auth/missing-email":
      return "Keine Email angegeben";
    case "auth/network-request-failed":
      return "Netzwerkfehler";
    default:
      return `Fehler: ${error.code}`;
  }
}
