import React from 'react';
import "../../../css/index.css";


function App() {
    return (
        <div className="allowScroll">
            <h4>
                <p>
                    <h2>Was ist Intimacy?</h2>
                    Bei Intimacy geht es um das Kennenlernen deiner Freunde.
                    Es geht darum, deren dunkle Geheimnisse, heimliche Vorstellungen,
                    unausgesprochene Vorlieben und Geschehnisse ans Licht zu bringen.<br/>
                    Rundenweise wird eine Frage gestellt, jeder antwortet anonym mit ja oder nein,
                    und schätzt dann offen wie viele mit ja gestimmt haben.
                </p>
                <p>
                    <h2>Wie spielt man Intimacy?</h2>
                    Der erste Spieler bekommt 4 Fragen vorgelegt. Die Fragen sind im Stil von “ich hab noch nie...”,
                    “ich würde gerne mal...” oder so ähnlich. Der Spieler darf sich eine aussuchen, indem er sie
                    anklickt.
                    Diese Frage geht dann an alle.<br/>
                    Jeder Spieler antwortet auf seinem Gerät anonym mit JA oder NEIN.
                    Danach gibt jeder eine Schätzung ab, wie viele in der Runde mit JA geantwortet haben.
                    Sobald alle abgestimmt haben, wird erst die Anzahl der tatsächlichen JA’s, dann die Spieler der
                    Entfernung nach geordnet, angezeigt.<br/>
                    Ab hier kann man sich überlegen wer wohl ja und wer nein gestimmt hat,
                    dass Spiel geht aber weiter und der nächste Spieler kann sich eine Frage aussuchen oder eine eigene
                    schreiben.
                </p>
            </h4>
        </div>
    );
}

export default App;
