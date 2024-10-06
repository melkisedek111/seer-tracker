export function generateRandomAlphanumericId(length: number): string {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		result += characters.charAt(randomIndex);
	}

	return result;
}

export function getInitials(fullName: string): string {
	// Split the full name into words
	const nameParts = fullName.split(" ");

	// Extract the first letter of each part, and take the first two
	const initials = nameParts
		.map((part) => part.charAt(0).toUpperCase())
		.slice(0, 2);

	// Join the initials and return
	return initials.join("");
}


export function pluralize(word: string): string {
	// Rules for irregular nouns
	word = word.toLowerCase();
	const irregularPlurals: { [key: string]: string } = {
	  child: "children",
	  person: "people",
	  man: "men",
	  woman: "women",
	  foot: "feet",
	  tooth: "teeth",
	  mouse: "mice",
	  goose: "geese",
	  // Add more irregulars as needed
	};
  
	// Check for irregular plurals
	if (irregularPlurals[word.toLowerCase()]) {
	  return irregularPlurals[word.toLowerCase()];
	}
  
	// Words that end in 'y' preceded by a consonant change 'y' to 'ies'
	if (/[a-zA-Z]y$/.test(word) && !/[aeiou]y$/.test(word)) {
	  return word.replace(/y$/, "ies");
	}
  
	// Words that end in 's', 'x', 'z', 'ch', or 'sh' add 'es'
	if (/[sxz]$/.test(word) || /[ch|sh]$/.test(word)) {
	  return word + "es";
	}
  
	// Words that end in 'f' or 'fe' change to 'ves'
	if (/(?:f|fe)$/.test(word)) {
	  return word.replace(/(?:f|fe)$/, "ves");
	}
  
	// Default case: Add 's' for most words
	return word + "s";
  }