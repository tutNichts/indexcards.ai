export const secondsUntilAnswer = 10;

const initialState = {
	sets: [],
};

export function persistState(state) {
	return new Promise(resolve => {
		window.localStorage.setItem('karteikarten', JSON.stringify(state));
		resolve();
	});
}

export function getState() {
	return window.localStorage.getItem('karteikarten')
		? JSON.parse(window.localStorage.getItem('karteikarten'))
		: initialState;
}

export const storedCards = [
	{
		question: "How does DNS work?",
		answer: "DNS, or Domain Name System, translates user-friendly domain names into IP addresses used by computers to locate and communicate with web servers. When you enter a domain name in your web browser, your computer contacts a local DNS server, which, if necessary, queries a series of higher-level DNS servers to resolve the IP address associated with that domain. Once the IP address is found, your computer can connect to the web server and access the website.",
		tags: ["Networking", "DNS"]
	},
	{
		question: "What is DNAT/SNAT?",
		tags: ["Networking", "Router"]
	},
	{
		question: "Warum ist es so schwierig Bedrohungen von Substituten zu erkennen?",
		answer: "Substituten existieren meist auf einem anderen Markt oder in einer anderen Branche.",
		tags: ["Substitute", "Strategisches Management"]
	},
	{
		question: "Durch welchen Hebel wird der Unternehmenswert am stärksten beeinflusst?",
		answer: "WACC",
		tags: ["WACC"]
	},
	{
		question: "Welche Untersuchungsbereiche behandelt die Five-Forces-Analyse von M. E. Porter?",
		answer: "Neue Anbieter\nAbnehmer\nLieferanten\nErsatzprodukte\nWettbewerber der Branche",
		tags: ["Five-Forces-Analyse", "Marktanalyse"]
	},
	{
		question: "Was ist die BCG-Matrix?",
		answer: "Die BCG Matrix (Bonston Consulting Group Matrix) ist ein Portfolio für das strategische Management für Unternehmen. Sie soll den Zusammenhang zwischen dem Produktlebenszyklus und der Kostenerfahrungskurve verdeutlichen.",
		tags: ["Boston Consulting Group", "BCG-Matrix"]
	},
	{
		question: "Welche Schutzziele gibt es?",
		answer: "- Integrität\n- Verfügbarkeit\n- Vertraulichkeit",
		tags: ["Schutzziele", "Informationssicherheit"]
	},
	{
		question: "Welche erweiterten Schutzziele gibt es?",
		answer: "- Pseudonymität\n- Anonymität\n- Authentizität\n- Verbindlichkeit",
		tags: ["Schutzziele", "Erweiterte Schutzziele", "Informationssicherheit"]
	},
	{
		question: "Nenne 4 wichtige Datenschutzgrundsätze!",
		answer: "- Rechtmäßigkeit\n- Datenminimierung\n- Richtigkeit\n- Integrität & Vertraulichkeit",
		tags: ["Datenschutz", "Datenschutzgrundsätze"]
	},
	{
		question: "Für wen gilt das Bundesdatenschutzgesetz!",
		answer: "für alle (Grundrecht auf informationelle Selbstbestimmung)",
		tags: ["Datenschutz", "Datenschutzgrundsätze", "BDSG", "Bundesdatenschutzgesetz"]
	},
	{
		question: "Wie funktionieren Zertifikate?",
		answer: "Ein Zertifikat vereinigt Identität IDA und Public Key Kpub A. Zertifikate sind von einer dritten vertrauenswürdigen Instanz unterschrieben, der Certificate Authority (CA).",
		tags: ["Informationssicherheit", "Zertifikate"]
	},
	{
		question: "Wie wird ein Risiko abgeschätzt?",
		answer: "1. Risiko feststellen\n2. Eintrittswahrscheinlichkeit abschätzen\n3. Maßnahmen Risikobehandlung",
		tags: ["Informationssicherheit", "Risikomanagement"]
	}
];

export const storedSets = [
	{
		topic: "Strategisches Management",
		tags: ["disruptive Innoviation", "WACC", "BCG-Matrix", "Substitute", "Synergieeffekte", "Strategiedreieck", "Nutzenversprechen", "Wertschöpfungsmodell", "Ertragsmodell", "Unternehmenswert", "Five-Forces-Analyse nach M. E. Porter", "WACC"],
	},
	{
		topic: "Fußball Trainer C Lizenz",
		tags: ["Flügelstürmer", "Mittelfeldspieler", "Libero", "Vollspann", "Flanke", "Trainer", "Weltmeisterschaft", "Ballon D'Or"],
	},
	{
		topic: "Datenschutz",
		tags: ["Datenschutzgrundsätze", "DSGVO", "BDSG"]
	},
	{
		topic: "Informationssicherheit",
		tags: ["Schutzziele", "Erweiterte Schutzziele", "Digitale Signatur", "Kryptographie", "Asynchrone Kryptographie", "Synchrone Kryptographie", "Hybride Verschlüsselung", "Hashfunktion", "Zertifikate", "Chain Of Trust", "Risikomanagement"]
	}
];