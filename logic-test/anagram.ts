function buildKey(word: string): string {
  const counts: number[] = [];
  let i = 0;
  let code = 0;

  for (i = 0; i < 26; i++) {
    counts[i] = 0;
  }

  for (i = 0; i < word.length; i++) {
    code = word.charCodeAt(i) - 97;
    if (code >= 0 && code < 26) {
      counts[code]++;
    }
  }

  return counts.join("#");
}

export function groupAnagrams(words: string[]): string[][] {
  const groups: { [key: string]: string[] } = {};
  const result: string[][] = [];
  let i = 0;
  let k = "";
  let key = "";

  for (i = 0; i < words.length; i++) {
    key = buildKey(words[i].toLowerCase());

    if (groups[key] === undefined) {
      groups[key] = [words[i]];
    } else {
      groups[key].push(words[i]);
    }
  }

  for (k in groups) {
    result.push(groups[k]);
  }

  return result;
}
