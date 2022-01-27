export default function (error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "E-Mail ungültig";
      break;
    case "auth/user-not-found":
      return "Kein Account mit dieser Email gefunden";
      break;
    case "auth/wrong-password":
      return "Passwort nicht korrekt";
      break;
    case "auth/weak-password":
      return "Passwort ist zu schwach";
      break;
    case "auth/email-already-in-use":
      return "Ein Account mit dieser Email existiert bereits";
      break;
    case "auth/missing-email":
      return "Keine Email angegeben";
      break;
    default:
      return `Fehler: ${error.code}`;
      break;
  }
}
