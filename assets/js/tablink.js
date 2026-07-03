function openTab(evt, identifier) {
  // Wird aufgerufen, wenn Tab-Schaltflächen angeklickt werden, zeigt den Inhalt an
  let i, tabcontent, tablinks; // Deklariert alle Variablen
  // Holt alle Elemente mit der Klasse "tabcontent" und entfernt die Klasse "active"
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }
  // Holt alle Elemente mit der Klasse "tablinks" und entfernt die Klasse "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  // Zeigt den aktuellen Tab an und hebt die Schaltfläche hervor, die den Tab geöffnet hat
  document.getElementById(identifier).classList.add("active");
  evt.currentTarget.classList.add("active");
}
