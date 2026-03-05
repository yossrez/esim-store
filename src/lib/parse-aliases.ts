export default function parseAliases(aliases: string): string[] {
  const aliasArray = aliases.toUpperCase().split("|");

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const countries = new Set<string>();

  for (const alias of aliasArray) {
    try {
      const countryName = regionNames.of(alias);
      if (countryName) countries.add(countryName);
    } catch {
      // ignore not valid code
    }
  }

  return Array.from(countries);
}
