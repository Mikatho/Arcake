import React from 'react';
import "../../../css/index.css";


function App() {
    return (
        <div className="allowScroll">
            <h4>
                <p>
                    <h2>Was ist Dronq?</h2>
                    Dronq ist ein Klassisches Trinkspiel. Es werden zufällige Aufgaben,
                    Abstimmungen oder Schätzfragen angezeigt. Für dieses Spiel ist es besonders wichtig,
                    Deine Spielerdaten richtig einzugeben, denn manchen Aufgaben wirst Du oder ein Mitspieler
                    direkt Angesprochen! Gefallen dir bestimmte Fragetypen nicht oder Du willst es heute ruhiger,
                    doller oder erotischer angehen lassen, kannst Du das in den Einstellungen anpassen!
                </p>
                <p>
                    <h2>Wie spielt man Dronq?</h2>
                    Jede Runde wird eine neue Frage, eine neue Aufgabe oder eine neue Abstimmung angezeigt.
                    Derjenige von euch, der den Raum erstellt hat, ist Gamemaster.
                    Er kann als einziger “NEXT” drücken, um die nächste Frage aufzurufen, oder “END ROUND”,
                    um eine Abstimmung frühzeitig zu beenden, falls nicht alle dabei sind.
                    Aktuell gibt es neben einfachen Aufgaben 4 verschiedene Kategorien von Fragen:<br/>
                    Ja/Nein:<br/>
                    Alle bekommen eine Frage gestellt und müssen mit Ja oder Nein antworten.
                    Die Spieler die in der Unterzahl sind haben verloren und werden in der Auflösung genannt!<br/>
                    Multiple Choice:<br/>
                    Alle bekommen eine Frage und 4 Antwortmöglichkeiten, im Stil alt bekannter Fernseh Quizshows.
                    Die Spieler, die falsch geantwortet haben, haben verloren und werden in der Auflösung genannt!<br/>
                    Wähle einen Spieler aus:<br/>
                    Alle werden gefragt, welcher Spieler am ehesten etwas tun würde,
                    jetzt etwas tun sollte oder einfach auf wen etwas am besten zutrifft.
                    Jeder kann über Knöpfe für einen Spieler abstimmen. Der meistgewählte Spieler wird in der Auflösung
                    genannt!<br/>
                    Schätzfrage:<br/>
                    Alle bekommen eine Schätzfrage gestellt. Ein Textfeld erscheint,
                    in dem jeder seine Schätzung abgeben kann. Sobald alle ihr Schätzung gesendet haben,
                    wird es ausgewertet und der Reihe nach angezeigt, wer am nächsten dran bis am weitesten weg
                    ist.<br/>

                    Weitere Kategorien sind in Arbeit, falls ihr vorschläge habt schreibt uns gerne im Menü unter
                    “Submit Ideas” oder per Mail an project.arcake@gmail.com!

                </p>
            </h4>
        </div>

    );
}

export default App;
